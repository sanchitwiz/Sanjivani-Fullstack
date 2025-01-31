import express from 'express';
import { isValidObjectId } from 'mongoose';
import Hospital from '../models/hospital.js';
import Doctor from '../models/Doctor.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const hospitals = await Hospital.find().populate('services doctors');
        res.json(hospitals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const hospital = await Hospital.findById(id).populate('services doctors');
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.json(hospital);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/new', async (req, res) => {
    try {
        const { name, address, latitude, longitude, bedsAvailable, services, doctors } = req.body;

        if (!name || !address || !latitude || !longitude || bedsAvailable === undefined) {
            return res.status(400).json({
                message: 'Please provide all required fields: name, address, latitude, longitude, and bedsAvailable'
            });
        }

        if (!isValidCoordinates(latitude, longitude)) {
            return res.status(400).json({
                message: 'Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180'
            });
        }

        const existingHospital = await Hospital.findOne({ name, address });
        if (existingHospital) {
            return res.status(400).json({
                message: 'A hospital with this name and address already exists'
            });
        }

        const serviceIds = (services || []).filter(id => isValidObjectId(id));
        const doctorIds = (doctors || []).filter(id => isValidObjectId(id));

        if (services.length !== serviceIds.length || doctors.length !== doctorIds.length) {
            return res.status(400).json({
                message: 'Invalid ObjectId(s) provided for services or doctors'
            });
        }

        const newHospital = new Hospital({
            name,
            address,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            },
            bedsAvailable,
            services: serviceIds,
            doctors: doctorIds
        });

        const savedHospital = await newHospital.save();

        const populatedHospital = await Hospital.findById(savedHospital._id)
            .populate('services', 'name description')
            .populate('doctors', 'name specialization');

        res.status(201).json({
            message: 'Hospital created successfully',
            hospital: populatedHospital
        });
    } catch (error) {
        console.error('Error creating hospital:', error);
        res.status(500).json({ message: 'Error creating hospital', error: error.message });
    }
});

router.post('/bulk-insert', async (req, res) => {
    const hospitals = req.body.hospitals;
    if (!Array.isArray(hospitals) || hospitals.length === 0) {
        return res.status(400).json({ message: 'Invalid input, expected an array of hospitals' });
    }
    try {
        const insertedHospitals = await Hospital.insertMany(hospitals);
        res.status(201).json({ message: 'Hospitals inserted successfully', hospitals: insertedHospitals });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting hospitals', error: error.message });
    }
});

function isValidCoordinates(latitude, longitude) {
    return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
}

router.get('/hospitals/nearby', async (req, res) => {
    try {
        const { latitude, longitude, radiusInKm = 5 } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Please provide latitude and longitude' });
        }

        const hospitals = await Hospital.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: radiusInKm * 1000
                }
            }
        }).populate('services').populate('doctors');

        res.json({ message: `Hospitals found within ${radiusInKm}km radius`, hospitals });
    } catch (error) {
        console.error('Error finding nearby hospitals:', error);
        res.status(500).json({ message: 'Error finding nearby hospitals', error: error.message });
    }
});

router.put('/:hospitalId/doctors', async (req, res) => {
    try {
        const { hospitalId } = req.params;
        const { doctorIds } = req.body;

        if (!Array.isArray(doctorIds) || doctorIds.length === 0) {
            return res.status(400).json({ message: 'Please provide an array of doctor IDs.' });
        }

        const validDoctors = await Doctor.find({ _id: { $in: doctorIds } });
        if (validDoctors.length !== doctorIds.length) {
            return res.status(400).json({ message: 'Some doctor IDs are invalid.' });
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(
            hospitalId,
            { $addToSet: { doctors: { $each: doctorIds } } },
            { new: true, runValidators: true }
        ).populate('doctors');

        if (!updatedHospital) {
            return res.status(404).json({ message: 'Hospital not found.' });
        }

        res.status(200).json({ message: 'Doctors added successfully to the hospital.', data: updatedHospital });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding doctors to the hospital.', error: error.message });
    }
});

export default router;
