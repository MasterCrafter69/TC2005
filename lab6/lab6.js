document.addEventListener('DOMContentLoaded', () => {
    const password = document.getElementById('password');
    const verifyPassword = document.getElementById('verifyPassword');
    const passwordHelp = document.getElementById('passwordHelp');
    const verifyHelp = document.getElementById('verifyHelp');
    const form = document.getElementById('passwordForm');

    password.addEventListener('focus', () => {
        passwordHelp.textContent = "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número.";
    });

    verifyPassword.addEventListener('input', () => {
        if(password.value === verifyPassword.value) {
            verifyHelp.textContent = "Las contraseñas coinciden.";
            verifyHelp.style.color = "green";
        } else {
            verifyHelp.textContent = "Las contraseñas no coinciden.";
            verifyHelp.style.color = "red";
        }
    });

    password.addEventListener('blur', () => {
        passwordHelp.textContent = "";
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if(password.value === verifyPassword.value && password.value.length >= 8) {
            alert("La contraseña ha sido validada correctamente.");
        } else {
            alert("Por favor, asegúrate de que las contraseñas coincidan y cumplan con los requisitos.");
        }
    });
});

