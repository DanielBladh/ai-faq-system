const express = require('express');
const faqController = require('../controllers/faqController');

const router = express.Router();

// Route to get answer for a question
router.post('/query', faqController.queryFAQ);

// Route to add new FAQ
router.post('/add', faqController.addFAQ);

// Route to get all FAQs
router.get('/', faqController.getAllFAQs);

// Route to delete FAQ
router.delete('/:id', faqController.deleteFAQ);

module.exports = router;