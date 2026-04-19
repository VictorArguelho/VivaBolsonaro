import { login as loginAccount } from '@services/authentication.js';
import { switchPage } from '/js/pages.js';

window.addEventListener('DOMContentLoaded', start);

const elements = {
  back: document.getElementById('back-main-page'),
  emailField: document.getElementById('email-field'),
  passwordField: document.getElementById('password-field'),
  loginBtn: document.getElementById('login-button'),
  messageTxt: document.getElementById('resposta'),
};

function start() {
  elements.back.addEventListener('click', () => {
    switchPage('index');
  });
  elements.loginBtn.addEventListener('click', login);
}

async function login() {
  const email = elements.emailField.value;
  const password = elements.passwordField.value;
  try {
    await loginAccount(email, password);
    switchPage('index');
  } catch (exception) {
    elements.messageTxt.textContent = exception.message;
  }
}
