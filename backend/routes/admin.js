import express from 'express';
// import bcrypt from 'bcrypt';
import HospitalAdmin from '../models/HospitalAdmin.js';
import Hospital from '../models/hospital.js';

const router = express.Router();

const validAttributes = [
    'availableDoctors', 'availableFacilities', 'ambulances', 'bloodBank', 'bedsTaken', 'bedsAvailable'
];

router.get('/', async (req, res) => {
    try {
        const admins = await HospitalAdmin.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/:email/:attribute', async (req, res) => {
    const { email, attribute } = req.params;

    if (!validAttributes.includes(attribute)) {
        return res.status(400).json({ message: 'Invalid attribute' });
    }

    try {
        const admin = await HospitalAdmin.findOne({ email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        res.json(admin[attribute]);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.put('/:email/:attribute/update', async (req, res) => {
    const { email, attribute } = req.params;
    const { bedsTaken, updateData } = req.body;

    if (!validAttributes.includes(attribute)) {
        return res.status(400).json({ message: 'Invalid attribute' });
    }

    try {
        const admin = await HospitalAdmin.findOne({ email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        admin[attribute] = attribute === 'bedsTaken' ? bedsTaken : updateData;

        await admin.save();
        res.json({ message: `${attribute} updated successfully`, [attribute]: admin[attribute] });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/new', async (req, res) => {
    try {
        const {
            username, password, email, hospitalName, hospital, availableFacilities, ambulances = [], availableDoctors = [], bloodBank = [], bedsAvailable, bedsTaken
        } = req.body;

        if (!username || !password || !email || !hospitalName || !hospital || !availableFacilities || !bedsAvailable || !bedsTaken) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const existingAdmin = await HospitalAdmin.findOne({ $or: [{ username }, { email }] });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const hospitalExists = await Hospital.findById(hospital);
        if (!hospitalExists) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new HospitalAdmin({
            username,
            password,
            email,
            hospitalName,
            hospital,
            availableFacilities,
            ambulances,
            availableDoctors,
            bloodBank,
            bedsAvailable,
            bedsTaken
        });

        const savedAdmin = await newAdmin.save();
        const { password: _, ...adminResponse } = savedAdmin.toObject();

        res.status(201).json({
            message: 'Hospital admin created successfully',
            admin: adminResponse
        });
    } catch (error) {
        console.error('Error creating hospital admin:', error);
        res.status(500).json({ message: 'Error creating hospital admin', error: error.message });
    }
});

router.get('/:email/', async (req, res) => {
    const { email } = req.params;

    try {
        const admin = await HospitalAdmin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
