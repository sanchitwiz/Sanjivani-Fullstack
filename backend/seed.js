import { connect, connection } from 'mongoose';
import { insertMany } from './models/hospital';
import { insertMany as _insertMany } from './models/Service';
import { insertMany as __insertMany } from './models/Doctor';
require('dotenv').config();

connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const seedDatabase = async () => {
    try {
        // Create new Services
        const newServices = [
            { name: 'General Medicine', description: 'General health specialist' },
            { name: 'Surgery', description: 'Surgical specialist' },
            { name: 'Dermatology', description: 'Skin specialist' }
        ];
        const serviceDocs = await _insertMany(newServices);

        // Create new Doctors
        const newDoctors = [
            { name: 'Dr. Rahul Verma', phoneNumber: '9876543210', specialty: 'General Medicine', opdTimings: '9:00 AM - 1:00 PM', day: 'Monday' },
            { name: 'Dr. Anjali Singh', phoneNumber: '8765432109', specialty: 'Surgery', opdTimings: '2:00 PM - 6:00 PM', day: 'Tuesday' },
            { name: 'Dr. Priya Sharma', phoneNumber: '7654321098', specialty: 'Dermatology', opdTimings: '10:00 AM - 4:00 PM', day: 'Wednesday' }
        ];
        const doctorDocs = await __insertMany(newDoctors);

        // Create new Hospitals
        const newHospitals = [
            {
                name: 'Shalin Hospital',
                address: '123 Shalin Road, New Delhi, Delhi 110001',
                location: { type: 'Point', coordinates: [77.1234, 28.1234] },
                bedsAvailable: 80,
                services: [serviceDocs[0]._id, serviceDocs[1]._id],
                doctors: [doctorDocs[0]._id]
            },
            {
                name: 'Muzaaf Hospital',
                address: '456 Muzaaf Lane, New Delhi, Delhi 110002',
                location: { type: 'Point', coordinates: [77.2345, 28.2345] },
                bedsAvailable: 100,
                services: [serviceDocs[1]._id, serviceDocs[2]._id],
                doctors: [doctorDocs[1]._id]
            },
            {
                name: 'Sanchit Hospital',
                address: '789 Sanchit Avenue, New Delhi, Delhi 110003',
                location: { type: 'Point', coordinates: [77.3456, 28.3456] },
                bedsAvailable: 60,
                services: [serviceDocs[0]._id, serviceDocs[2]._id],
                doctors: [doctorDocs[2]._id]
            }
        ];
        await insertMany(newHospitals);

        console.log('New hospitals seeded successfully!');
        connection.close();
    } catch (err) {
        console.error(err);
    }
};

seedDatabase();
