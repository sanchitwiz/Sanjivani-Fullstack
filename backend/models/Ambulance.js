import { Schema, model } from 'mongoose';

const ambulanceSchema = new Schema({
    number: { type: String, required: true },
    driverName: { type: String, required: true },
    mobile: { type: String, required: true },  // Make sure this field is defined
    status: { type: String, default: 'idle' },
    currentLocation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    destination: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    clientemail: {type: String}
});

export default model('Ambulance', ambulanceSchema);

