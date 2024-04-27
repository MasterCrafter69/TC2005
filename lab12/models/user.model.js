const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {

    constructor(username, password){
        this.username = username;
        this.password = password;
    }

    save() {
        return bcrypt.hash(this.password, 12).then((password_cifrado) => {
            return db.execute(
            'INSERT INTO usuario (username, contraseña) VALUES (?, ?)',
            [this.username, password_cifrado]
            );
        })
        .catch((error) => {
            console.log(error);
            throw Error('Nombre de usuario ya en uso.')
        
        })
        

    }

    static fetchOne(username, password){
        return db.execute(
            'SELECT * FROM usuario WHERE username=?',
            [username]);
    }

}
