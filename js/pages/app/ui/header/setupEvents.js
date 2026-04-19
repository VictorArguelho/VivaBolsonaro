import { switchPage } from '/js/pages.js';
import { isSessionLogged, logout } from '@services/authentication.js';
import { loadGame } from '@appGame/saves.js';
import { elements } from '@appUI/header/elements.js';

export async function setup() {
  const isLogged = await isSessionLogged();

  if (isLogged) {
    loggedSetup();
  }
  if (!isLogged) {
    notLoggedSetup();
  }
}

function loggedSetup() {
  elements.logged.logoutBtn.addEventListener('click', async () => {
    await logout();
    await loadGame();
  });
}

function notLoggedSetup() {
  elements.notLogged.loginBtn.addEventListener('click', () => {
    switchPage('login');
  });
  elements.notLogged.signupBtn.addEventListener('click', () => {
    switchPage('signUp');
  });
}
