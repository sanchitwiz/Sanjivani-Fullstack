const express = require('express');
const router = express.Router();
const Service = require('../models/Service'); // Assuming Service is the model for your service schema

router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json({
            message: 'Services fetched successfully',
            services
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching services',
            error: error.message
        });
    }
});

// Get a specific service by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({
                message: 'Service not found'
            });
        }

        res.json({
            message: 'Service fetched successfully',
            service
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching service',
            error: error.message
        });
    }
});

// Create a new service
router.post('/new', async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'Service name is required'
        });
    }

    try {
        const newService = new Service({
            name,
            description
        });

        const savedService = await newService.save();
        res.status(201).json({
            message: 'Service created successfully',
            service: savedService
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating service',
            error: error.message
        });
    }
});

// Delete a service by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedService = await Service.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({
                message: 'Service not found'
            });
        }

        res.json({
            message: 'Service deleted successfully',
            service: deletedService
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting service',
            error: error.message
        });
    }
});

router.post('/bulk-insert', async (req, res) => {
    const services = req.body.services; // Expecting an array of services in the request body
    if (!Array.isArray(services) || services.length === 0) {
        return res.status(400).json({ message: 'Invalid input, expected an array of services' });
    }
    try {
        await Service.deleteMany(); // Optional: Remove existing data
        const insertedServices = await Service.insertMany(services);
        res.status(201).json({
            message: 'Services inserted successfully',
            services: insertedServices
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error inserting services',
            error: error.message
        });
    }
});

module.exports = router;
