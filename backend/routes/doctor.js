import express from 'express';
import Doctor from '../models/Doctor.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/bulk-insert', async (req, res) => {
    try {
        const doctors = req.body.doctors;

        if (!Array.isArray(doctors) || doctors.length === 0) {
            return res.status(400).json({ message: 'Please provide an array of doctors.' });
        }

        const insertedDoctors = await Doctor.insertMany(doctors);
        res.status(201).json({ message: 'Doctors added successfully.', data: insertedDoctors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding doctors.', error: error.message });
    }
});

const updateUserAttribute = async (req, res, attribute) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        if (req.body[attribute]) {
            doctor[attribute] = req.body[attribute];
            await doctor.save();
            return res.json({ message: `${attribute} updated successfully`, doctor });
        } else {
            return res.status(400).json({ message: `${attribute} is required` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

router.put('/:id/name/update', (req, res) => updateUserAttribute(req, res, 'name'));
router.put('/:id/email/update', (req, res) => updateUserAttribute(req, res, 'email'));
router.put('/:id/phoneNumber/update', (req, res) => updateUserAttribute(req, res, 'phoneNumber'));

export default router;