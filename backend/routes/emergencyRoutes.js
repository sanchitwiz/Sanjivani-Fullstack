import express from 'express';
import emergencyController from '../controllers/emergencyController.js';

const router = express.Router();

router.post('/', emergencyController.handleEmergency);

export default router;