import { Schema, model } from 'mongoose';

const hospitalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    bedsAvailable: {
        type: Number,
        required: true
    },
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }],
    doctors: [{
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    }]
});

hospitalSchema.index({ location: '2dsphere' });

export default model('Hospital', hospitalSchema);
