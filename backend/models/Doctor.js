import { Schema, model } from 'mongoose';

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    opdTimings: {
        type: String, // Format: "9:00 AM - 5:00 PM" or any string format
        required: true
    },
    day: {
        type: [String], // Array to store multiple working days like ["Monday", "Wednesday"]
        required: true
    }
});

export default model('Doctor', doctorSchema);
