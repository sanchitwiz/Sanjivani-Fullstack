const express = require('express');
const router = express.Router();
const HospitalAdmin = require('../models/HospitalAdmin');

const validAttributes = ['bedsTaken', 'availableFacilities', 'availableDoctors'];

router.put('/:email/:attribute/update', async (req, res) => {
    const { email, attribute } = req.params;
    const { updateData } = req.body;

    if (!validAttributes.includes(attribute)) {
        return res.status(400).json({ message: 'Invalid attribute' });
    }

    try {
        const admin = await HospitalAdmin.findOne({ email: email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        // Update the attribute with the new data
        admin[attribute] = updateData;

        await admin.save();
        res.json({ message: `${attribute} updated successfully`, [attribute]: admin[attribute] });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/:email', async (req, res) => {
    try {
        const admin = await HospitalAdmin.findOne({ email: req.params.email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await HospitalAdmin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        if (admin.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.json({ message: 'Login successful', admin });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
