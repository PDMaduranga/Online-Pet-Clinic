const express = require('express');
const {getAvailableClinics, askQuestion, getOwnerQueries } = require('../controllers/ownerController');
const router = express.Router();
const { protect, ownerOnly } = require('../middleware/authMiddleware');

router.get('/availableclinics', protect, ownerOnly, getAvailableClinics);
router.post('/ask', protect, ownerOnly, askQuestion);
router.get('/responsestoqueries', protect, ownerOnly, getOwnerQueries);

module.exports = router;