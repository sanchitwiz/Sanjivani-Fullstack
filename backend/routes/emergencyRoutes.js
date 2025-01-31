const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

router.post('/', emergencyController.handleEmergency);

module.exports = router;
