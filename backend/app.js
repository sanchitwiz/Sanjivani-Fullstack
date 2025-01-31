import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import FormData from 'form-data';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

import ambulanceRouter from './routes/ambulance.js';
import adminRouter from './routes/admin.js';
import doctorRouter from './routes/doctor.js';
import userRouter from './routes/user.js';
import hospitalRouter from './routes/hospital.js';
import servicesRouter from './routes/services.js';

import Hospital from './models/hospital.js';
import Service from './models/Service.js';
import Doctor from './models/Doctor.js';

// Equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// HTTP and Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Middleware to attach io to request
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Route registrations
app.use('/ambulance', ambulanceRouter);
app.use('/admin', adminRouter);
app.use('/doctor', doctorRouter);
app.use('/user', userRouter);
app.use('/hospital', hospitalRouter);
app.use('/services', servicesRouter);

// Google Generative AI setup
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const upload = multer({ dest: 'uploads/' });

// MongoDB connection with async/await
try {
    await mongoose.connect(process.env.MONGO_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    });
    console.log('MongoDB Connected');
} catch (err) {
    console.error("MongoDB connection error:", err);
}

// Async utility functions with named arrow functions
const sendImageForPrediction = async (imagePath) => {
    try {
        const imageFile = fs.createReadStream(imagePath);
        const form = new FormData();
        form.append('file', imageFile);

        const response = await axios.post('http://localhost:5100/predict', form, {
            headers: form.getHeaders()
        });

        console.log('Prediction:', response.data);
    } catch (error) {
        console.error('Error sending image for prediction:', error.message);
    }
};

// Key routes as async arrow functions
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

// app.get('/', async (req, res) => {
//     try {
//         const readmePath = path.join(__dirname, 'readme.md');
//         const data = await fs.promises.readFile(readmePath, 'utf8');
//         res.send(`<pre>${data}</pre>`);
//     } catch (err) {
//         console.error('Error reading README file:', err);
//         res.status(500).send('Server error');
//     }
// });

app.get('/hospitals', async (req, res) => {
    try {
        const hospitals = await Hospital.find().populate('services doctors');
        res.render('hospitals', { hospitals });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

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

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('riderLocation', (data) => {
        data.lat += 0.1;
        data.lng += 0.1;
        io.emit('riderLocationUpdate', data);
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Production route handling
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

export { app, io };