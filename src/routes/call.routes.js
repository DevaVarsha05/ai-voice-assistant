const express = require('express');
const router = express.Router();
const callController = require('../controllers/call.controller');

router.post('/incoming', callController.handleIncoming);

router.post('/process-speech', callController.processSpeech);
module.exports = router;