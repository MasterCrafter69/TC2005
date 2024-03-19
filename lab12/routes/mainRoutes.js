const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Inicio' });
});

router.get('/about', (req, res, next) => {
    res.render('about', { title: 'Sobre Nosotros' });
});

router.get('/contact', (req, res, next) => {
    res.render('contact', { title: 'Contacto' });
});

module.exports = router;

