const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/form', (req, res, next) => {
    res.render('form', { title: 'Formulario' });
});

router.post('/submit-form', (req, res, next) => {
    const { nombre } = req.body;
    console.log(nombre);
    res.redirect('/');
});

module.exports = router;

