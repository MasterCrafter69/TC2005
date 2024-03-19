const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/form', (req, res, next) => {
    res.render('form', { title: 'Formulario' });
});

router.post('/submit-form', (req, res, next) => {
    const { nombre } = req.body;
    const filePath = path.join(__dirname, '../', 'data', 'submissions.txt');
    const fileContent = `Nombre: ${nombre}\n`;
    
    fs.appendFile(filePath, fileContent, (err) => {
        if (err) {
            console.error('Error al guardar el formulario:', err);
            return res.send('Error al procesar tu formulario');
        }
        res.redirect('/');
    });
});

module.exports = router;

