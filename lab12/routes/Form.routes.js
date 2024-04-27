const express = require('express');
const router = express.Router();
const formController = require('../controllers/Form.controller');  

// Rutas
router.get('/form', formController.getForm);
router.post('/submit-form', formController.submitForm);

module.exports = router;
