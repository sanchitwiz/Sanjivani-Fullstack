const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const HospitalAdmin = require('../models/HospitalAdmin');
const Hospital = require('../models/hospital');

const validAttributes = [
    'availableDoctors', 'availableFacilities', 'ambulances', 'bloodBank' , 'bedsTaken', 'bedsAvailable'
];

router.get('/', async (req, res) => {
    try {
        const admins = await HospitalAdmin.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get a specific attribute for a hospital admin by email
router.get('/:email/:attribute', async (req, res) => {
    const { email, attribute } = req.params;

    if (!validAttributes.includes(attribute)) {
        return res.status(400).json({ message: 'Invalid attribute' });
    }

    try {
        const admin = await HospitalAdmin.findOne({ email: email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        res.json(admin[attribute]);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update a specific attribute for a hospital admin by email
router.put('/:email/:attribute/update', async (req, res) => {
    const { email, attribute } = req.params;
    const { bedsTaken } = req.body; // Change this to directly get bedsTaken

    if (!validAttributes.includes(attribute)) {
        return res.status(400).json({ message: 'Invalid attribute' });
    }

    try {
        const admin = await HospitalAdmin.findOne({ email: email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        // Update only if the new value is valid
        if (attribute === 'bedsTaken') {
            admin[attribute] = bedsTaken; // Update bedsTaken directly
        } else {
            admin[attribute] = req.body.updateData; // For other attributes
        }

        await admin.save();
        res.json({ message: `${attribute} updated successfully`, [attribute]: admin[attribute] });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

 // Use a capitalized name for the model

router.post('/new', async (req, res) => {
    try {
        const {
            username,
            password,
            email,
            hospitalName,
            hospital, // This is the hospital ID from the request body
            availableFacilities,
            ambulances,
            availableDoctors,
            bloodBank,
            bedsAvailable,
            bedsTaken
        } = req.body;

        // Validate required fields
        if (!username || !password || !email || !hospitalName || !hospital || !availableFacilities || !bedsAvailable || !bedsTaken) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if username or email already exists
        const existingAdmin = await HospitalAdmin.findOne({
            $or: [{ username }, { email }]
        });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Validate the hospital ID
        const hospitalExists = await Hospital.findById(hospital); // Use the correct Mongoose model
        if (!hospitalExists) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new hospital admin
        const newAdmin = new HospitalAdmin({
            username,
            password,
            email,
            hospitalName,
            hospital,
            availableFacilities,
            ambulances: ambulances || [],
            availableDoctors: availableDoctors || [],
            bloodBank: bloodBank || [],
            bedsAvailable,
            bedsTaken
        });

        // Save to database
        const savedAdmin = await newAdmin.save();

        // Remove password from response
        const adminResponse = savedAdmin.toObject();
        delete adminResponse.password;

        res.status(201).json({
            message: 'Hospital admin created successfully',
            admin: adminResponse
        });

    } catch (error) {
        console.error('Error creating hospital admin:', error);
        res.status(500).json({ 
            message: 'Error creating hospital admin',
            error: error.message 
        });
    }
});


router.get('/:email/', async (req, res) => {
    const { email } = req.params;

    try {
        const admin = await HospitalAdmin.findOne({ email: email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;