import express from 'express';
import Service from '../models/Service.js'; // Assuming Service is the model for your service schema

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json({ message: 'Services fetched successfully', services });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json({ message: 'Service fetched successfully', service });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service', error: error.message });
    }
});

router.post('/new', async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Service name is required' });
    }

    try {
        const newService = new Service({ name, description });
        const savedService = await newService.save();
        res.status(201).json({ message: 'Service created successfully', service: savedService });
    } catch (error) {
        res.status(500).json({ message: 'Error creating service', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json({ message: 'Service deleted successfully', service: deletedService });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service', error: error.message });
    }
});

router.post('/bulk-insert', async (req, res) => {
    const { services } = req.body;
    if (!Array.isArray(services) || services.length === 0) {
        return res.status(400).json({ message: 'Invalid input, expected an array of services' });
    }
    try {
        await Service.deleteMany(); // Optional: Remove existing data
        const insertedServices = await Service.insertMany(services);
        res.status(201).json({ message: 'Services inserted successfully', services: insertedServices });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting services', error: error.message });
    }
});

export default router;
