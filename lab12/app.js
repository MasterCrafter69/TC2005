const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(mainRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

const PORT = process.env.PORT || 3000;

