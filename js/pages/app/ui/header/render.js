import { getSession, isSessionLogged } from '@services/authentication.js';
import { elements } from '@appUI/header/elements.js';

export async function render() {
  const isLogged = await isSessionLogged();

  if (isLogged) {
    const session = await getSession();
    elements.header.innerHTML = getLoggedHTML(session.email);
  }
  if (!isLogged) {
    elements.header.innerHTML = getNotLoggedHTML();
  }
}

function getLoggedHTML(email) {
  return `
    <h1 id="email-text">${email}</h1>
    <button id="logout-button">Logout</button>
  `;
}

function getNotLoggedHTML() {
  return `
    <button id="login-button">Login</button>
    <button id="signup-button">Signup</button>
  `;
}
