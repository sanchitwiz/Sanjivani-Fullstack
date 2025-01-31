import express from 'express';
import Ambulance from '../models/Ambulance.js';
import { io } from '../app.js';

const router = express.Router();

router.get('/new', async (req, res) => {
    const newAmbulance = new Ambulance({});
    await newAmbulance.save();
    res.render('ambulance/new', { ambulanceId: newAmbulance._id });
});

router.get('/:id', async (req, res) => {
    try {
        const ambulance = await Ambulance.findById(req.params.id);
        if (!ambulance) {
            return res.status(404).json({ message: 'Ambulance not found' });
        }
        res.json(ambulance);
    } catch (error) {
        console.error('Error fetching ambulance:', error);
        res.status(500).json({ message: 'Error fetching ambulance' });
    }
});

router.post('/new', async (req, res) => {
    const { source, destination } = req.body;

    try {
        const newAmbulance = new Ambulance({
            status: 'idle',
            currentLocation: { lat: 0, lng: 0 },
            destination: { lat: 0, lng: 0 }
        });

        await newAmbulance.save();

        io.emit('ambulanceRequest', {
            ambulanceId: newAmbulance._id,
            source,
            destination
        });

        res.json({ ambulanceId: newAmbulance._id });
    } catch (error) {
        console.error('Error creating new ambulance:', error);
        res.status(500).json({ message: 'Error booking ambulance' });
    }
});

router.get('/:id/rider', (req, res) => {
    const { id: ambulanceId } = req.params;
    res.render('ambulance/rider', { ambulanceId });
});

router.get('/:id/track', (req, res) => {
    const { id: ambulanceId } = req.params;
    res.render('ambulance/track', { ambulanceId });
});

router.post('/client/request', (req, res) => {
    const { name, hospitalID, adminEmail } = req.body;

    console.log('Received request with client name:', name, ' for hospitalID:', hospitalID, ' from adminEmail:', adminEmail);

    if (!io) {
        console.error('Socket.io instance is not available');
        return res.status(500).json({ error: 'Socket.io instance not available' });
    }

    try {
        io.emit('ambulanceRequest', { clientName: name, hospitalID, adminEmail });
        res.json({ message: 'Request sent to admin' });
    } catch (err) {
        console.error('Error emitting ambulance request:', err);
        res.status(500).json({ error: 'Failed to send ambulance request' });
    }
});

router.post('/admin/assign', async (req, res) => {
    const { ambulanceNumber, driverName, mobile, email } = req.body;

    if (!io) {
        console.error('Socket.io instance is not available');
        return res.status(500).json({ error: 'Socket.io instance not available' });
    }

    try {
        const newAmbulance = new Ambulance({
            number: ambulanceNumber,
            driverName,
            mobile,
            status: 'idle',
            currentLocation: { lat: 0, lng: 0 },
            destination: { lat: 0, lng: 0 },
            clientemail: email,
        });
        await newAmbulance.save();
        io.emit('ambulanceAssigned', { ambulanceId: newAmbulance._id, clientemail: email });

        res.status(201).json({ ambulanceId: newAmbulance._id });
    } catch (error) {
        console.error('Error creating new ambulance:', error);
        res.status(500).json({ message: 'Error assigning ambulance' });
    }
});

export default router;
