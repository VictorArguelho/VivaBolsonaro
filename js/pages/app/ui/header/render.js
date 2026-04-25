import { getSession, isSessionLogged } from '@services/authentication.js';
import { elements } from '@appUI/header/elements.js';
import { getUserData } from '@services/user.js';
import { USER_INFO_COLLECTION } from '/js/consts.js';

export async function render() {
  const isLogged = await isSessionLogged();

  if (isLogged) {
    const userInfo = await getUserData(USER_INFO_COLLECTION);
    elements.header.innerHTML = getLoggedHTML(userInfo.username);
  }
  if (!isLogged) {
    elements.header.innerHTML = getNotLoggedHTML();
  }
}

function getLoggedHTML(username) {
  return `
    <span class="text email-text">${username}</span>
    <button type="button" class="button text logout-button">Sair</button>
  `;
}

function getNotLoggedHTML() {
  return `
    <button type="button" class="button text login-button">Entrar</button>
    <button type="button" class="button text signup-button">Cadastrar</button>
  `;
}
