const Usuario = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.get_login = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('login', {
        username: request.session.username || '',
        registrar: false,
        error: error,
        csrfToken: request.csrfToken(),
    });
};

exports.post_login = (request, response, next) => {
   
	Usuario.fetchOne(request.body.username)
        .then(([users, fieldData]) => {
            if(users.length == 1) {
                const user = users[0];
                bcrypt.compare(request.body.password, user.contraseña)
                .then(doMatch => {
                    if(doMatch) {
                        request.session.isLoggedIn = true;
                        request.session.username = user.username;
                        return request.session.save(err => {
                           response.redirect('/index');
                        });
                 } else {
                        request.session.error = 'El usuario y/o contraseña son incorrectos.';
                        return response.redirect('/user/login');
                    }
                }) .catch(err => {
                    console.log(err);
                    response.redirect('/user/login');
                });
            } else {
                request.session.error = 'El usuario y/o contraseña son incorrectos.'
                response.redirect('/user/login');
            }
        })
        .catch((error) => {console.log(error)});
};

exports.get_home = (request, response, next) => {
    response.render('index', {
        username: request.session.username || '',
    })
}

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/user/login');
    });

}

exports.get_signup = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('login', {
        username: request.session.username || '',
        registrar: true,
        error: error,
        csrfToken: request.csrfToken(),
    });
};

exports.post_signup = (request, response, next) => {
    const nuevo_usuario = new Usuario(request.body.username, request.body.password);
    nuevo_usuario.save()
    .then(([rows, fieldData]) => {
        response.redirect('/user/login');
    })
    .catch((error) => {
        console.log(error);
        request.session.error = 'Nombre de usuario inválido.';
        response.redirect('/user/signup');
    });
}
