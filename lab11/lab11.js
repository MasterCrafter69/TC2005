const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Módulo 1: Rutas Generales
// Ruta 1
app.get('/', (req, res) => {
    res.send('Página de inicio');
});

// Ruta 2
app.get('/ruta1', (req, res) => {
    res.send('Respuesta de la ruta "/ruta1"');
});

// Ruta 3
app.get('/ruta2', (req, res) => {
    res.send('Respuesta de la ruta "/ruta2"');
});

// Módulo 2: Rutas de Módulo/Formulario
// Ruta 4
app.get('/modulo2/formulario', (req, res) => {
    res.send('<form action="/modulo2/enviar-formulario" method="POST"><input type="text" name="mensaje"/><button type="submit">Enviar</button></form>');
});

// Ruta 5 (Manejo del formulario)
app.post('/modulo2/enviar-formulario', (req, res) => {
    const mensaje = req.body.mensaje;
    fs.appendFileSync('data/submissions.txt', mensaje + '\n');
    res.send('Mensaje recibido: ' + mensaje);
});

// Ruta para manejar 404 - No encontrado
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

