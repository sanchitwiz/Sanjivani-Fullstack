const mongoose = require('mongoose');

const hospitalAdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hospitalName:{
        type:String,
        required:true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital', 
        required: true
    },
    availableFacilities: {
        type: [String], 
        required: true
    },
    ambulances: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ambulance' 
    }],
    availableDoctors: {
        type: [String] 
    },
    bloodBank: {
        type: [String] 
    },
    bedsAvailable: {
        type: Number,
        required: true
    },
    bedsTaken: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('HospitalAdmin', hospitalAdminSchema);
