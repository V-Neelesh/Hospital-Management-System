const express = require('express');
const router = express.Router();
const { createApplication, getApplications, updateApplication } = require('../controllers/applicationController');

router.post('/', createApplication);
router.get('/', getApplications);
router.put('/:id', updateApplication);

module.exports = router;
