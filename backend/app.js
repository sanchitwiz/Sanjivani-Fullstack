const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const multer = require('multer');
const Hospital = require('./models/hospital');
const Service = require('./models/Service');
const Doctor = require('./models/Doctor');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// socket.io and server initialization
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);

// Enable CORS for all routes in Express
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true // Allow credentials (if needed)
  }));

// Initialize Socket.io with CORS settings
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Allow frontend at localhost:5173
        methods: ['GET', 'POST'],
        credentials: true, // If you need cookies or authentication
    },
});

// Attach the io object to req so it can be used in routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Import routes
const ambulancerouter = require('./routes/ambulance');
const adminrouter = require('./routes/admin');
const doctorrouter = require('./routes/doctor');
const userrouter = require('./routes/user');
const hospitalrouter = require('./routes/hospital');
const servicesRouter = require('./routes/services');


// Use routes
app.use('/ambulance', ambulancerouter);
app.use('/admin', adminrouter);
app.use('/doctor', doctorrouter);
app.use('/user', userrouter);
app.use('/hospital', hospitalrouter);
app.use('/services', servicesRouter);

// Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const upload = multer({ dest: 'uploads/' });

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log("error aarha h", err));

// Example of sending image for prediction
async function sendImageForPrediction(imagePath) {
    try {
        const imageFile = fs.createReadStream(imagePath);
        const form = new FormData();
        form.append('file', imageFile);

        const response = await axios.post('http://localhost:5100/predict', form, {
            headers: form.getHeaders(),
        });

        console.log('Prediction:', response.data);
    } catch (error) {
        console.error('Error sending image for prediction:', error.message);
    }
}

// Example route using Gemini and MongoDB
app.post('/get-hospital', async (req, res) => {
    const { prompt } = req.body;

    try {
        const services = await Service.find();
        const serviceNames = services.map(service => service.name);

        const response = await model.generateContent(`Choose the most relevant service for the following problem in one word: "${prompt}". Services: ${serviceNames.join(", ")}`);
        const selectedService = response.response.text().trim();

        console.log('Gemini API Response:', selectedService);

        const service = await Service.findOne({ name: selectedService });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        console.log('Selected Service ID:', service._id);

        const hospitals = await Hospital.find({ services: service._id }).populate('doctors');

        console.log('Hospitals Found:', hospitals);

        if (hospitals.length === 0) {
            return res.status(404).json({ message: 'No hospitals found offering this service' });
        }

        res.json({
            selectedService,
            hospitals,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Example of search and first-aid YouTube video fetching
async function searchYouTube(query) {
    try {
        const yt = await import('youtube-search-without-api-key');
        const videos = await yt.search(query);
        const limitedVideos = videos.slice(0, 1).map(video => ({
            title: video.title,
            url: video.url,
        }));
        return limitedVideos[0]; // return only the first video
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        return null; // handle error gracefully
    }
}

app.post('/get-first-aid', async (req, res) => {
    const { prompt } = req.body;

    try {
        const geminiResponse = await model.generateContent(`Provide immediate first aid instructions for: "${prompt}". Respond in clear, concise pointers without bold italics or line breaks etc..only text and numbering`);
        const firstAidInstructions = geminiResponse.response.candidates[0].content;

        const videoPrompt = `first aid for: "${prompt}"`;
        const videoResult = await searchYouTube(videoPrompt);
        res.json({
            firstAidInstructions: firstAidInstructions,
            youtubeVideo: videoResult ? videoResult.url : 'No relevant video found',
        });
    } catch (err) {
        console.error('Error fetching first aid instructions or YouTube video:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Example index route
app.get('/', (req, res) => {
    const readmePath = path.join(__dirname, 'readme.md');
    fs.readFile(readmePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading README file:', err);
            return res.status(500).send('Server error');
        }
        res.send(`<pre>${data}</pre>`);
    });
});

// Hospital list route
app.get('/hospitals', async (req, res) => {
    try {
        const hospitals = await Hospital.find().populate('services doctors');
        res.render('hospitals', { hospitals });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Example route using OSRM server
const OSRM_SERVER_URL = 'http://router.project-osrm.org';

app.get('/route', async (req, res) => {
    const { startLat, startLng, endLat, endLng } = req.query;

    if (!startLat || !startLng || !endLat || !endLng) {
        return res.status(400).json({ error: 'Missing required parameters.' });
    }

    try {
        const response = await axios.get(`${OSRM_SERVER_URL}/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?geometries=polyline&overview=full`);

        const routeData = response.data.routes[0];

        if (routeData) {
            res.json({ route: routeData });
        } else {
            res.status(404).json({ error: 'No route found.' });
        }
    } catch (error) {
        console.error('Error fetching route:', error);
        res.status(500).json({ error: 'Failed to fetch route.' });
    }
});

// Socket.io event handlers
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('riderLocation', (data) => {
        console.log(data);
        data.lat += 0.1;
        data.lng += 0.1;
        console.log(data);
        io.emit('riderLocationUpdate', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// File upload and prediction route
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const imageFile = req.file;

        const form = new FormData();
        form.append('file', fs.createReadStream(imageFile.path));

        const flaskResponse = await axios.post('http://localhost:5100/predict', form, {
            headers: form.getHeaders(),
        });

        res.json(flaskResponse.data);
    } catch (error) {
        console.error('Error during prediction:', error.message);
        res.status(500).json({ error: 'Failed to get prediction' });
    }
});

app.get('/indextest', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});








if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { app, io };
