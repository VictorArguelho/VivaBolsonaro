import { createAccount } from '@signupPage/accountCreator.js';
import { switchPage } from '/js/pages.js';

window.addEventListener('DOMContentLoaded', start);

const elements = {
  back: document.querySelector('.back-button'),
  emailField: document.querySelector('.email-field'),
  passwordField: document.querySelector('.pass-field'),
  usernameField: document.querySelector('.user-field'),
  signupBtn: document.querySelector('.signup-button'),
  messageTxt: document.querySelector('.response'),
};

function start() {
  elements.back.addEventListener('click', () => {
    switchPage('index');
  });
  elements.signupBtn.addEventListener('click', signup);
}

async function signup() {
  const email = elements.emailField.value;
  const password = elements.passwordField.value;
  const username = elements.usernameField.value;
  try {
    await createAccount(email, password, username);
    switchPage('index');
  } catch (exception) {
    elements.messageTxt.textContent = exception.message;
  }
}
