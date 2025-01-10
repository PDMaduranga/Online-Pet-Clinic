const express = require('express');
const {getClinicQueries, respondToQuery } = require('../controllers/clinicController');
const router = express.Router();
const { protect, clinicOnly } = require('../middleware/authMiddleware');

router.get('/queries', protect, clinicOnly, getClinicQueries);
router.post('/respond/:id', protect, clinicOnly, respondToQuery);

module.exports = router;