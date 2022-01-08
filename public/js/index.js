import { login, logout } from './login';

const loginForm = document.querySelector('.login-form');
const btnLogin = document.querySelector('.btn__login');
const btnLogOut = document.querySelector('.btn--logout');

if (btnLogin) {
  btnLogin.addEventListener('click', (e) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}

if (btnLogOut) {
  btnLogOut.addEventListener('click', logout);
}
