const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const path = require('path');

app.use(session({
  secret: 'string secreto muy largo', 
  resave: false,
  saveUninitialized: false,
}));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Rutas
const rutaUser = require('./routes/user.routes');
app.use('/user', rutaUser)

const mainRoutes = require('./routes/mainRoutes');
app.use('/',mainRoutes);

const formularioRutas = require('./routes/Form.routes');
app.use('/',formularioRutas);

//Manejo de errores
app.use((request, response, next) => {
  response.status(404);
  response.sendFile(
    path.join(__dirname, 'views', '404.html')
  );
});

app.listen(3000);
