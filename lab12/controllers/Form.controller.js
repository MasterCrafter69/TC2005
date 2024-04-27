
const fs = require('fs');
const path = require('path');

// Controlador para mostrar el formulario
exports.getForm = (req, res) => {
    // Establecer una cookie HttpOnly cuando se carga el formulario
    res.setHeader('Set-Cookie', 'user_visited=Form; HttpOnly');
    res.render('form', { title: 'Formulario' });
};

// Controlador para procesar el formulario
exports.submitForm = (req, res) => {
    const { nombre } = req.body;
    const filePath = path.join(__dirname, '../data', 'submissions.txt');
    const fileContent = `Nombre: ${nombre}\n`;

    // Acceder a una cookie existente
    const cookies = req.cookies;
    console.log('Cookies recibidas:', cookies);

    // Usar variables de sesión para almacenar información temporal
    req.session.user_name = nombre;

    fs.appendFile(filePath, fileContent, err => {
        if (err) {
            console.error('Error al guardar el formulario:', err);
            res.send('Error al procesar tu formulario');
            return;
        }
        // Eliminar la información de la sesión después de guardar los datos
        req.session.destroy();
        res.redirect('/');
    });
};
