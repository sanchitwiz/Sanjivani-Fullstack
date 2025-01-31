const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Doctor', doctorSchema);
