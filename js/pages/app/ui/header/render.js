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
    <span class="text email-text">${email}</span>
    <button type="button" class="button text logout-button">Sair</button>
  `;
}

function getNotLoggedHTML() {
  return `
    <button type="button" class="button text login-button">Entrar</button>
    <button type="button" class="button text signup-button">Cadastrar</button>
  `;
}
