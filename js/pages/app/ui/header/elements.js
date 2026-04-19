import { isSessionLogged } from '@services/authentication.js';

export const elements = {
  header: document.getElementById('header-nav'),
  logged: {},
  notLogged: {},
};

export async function refresh() {
  const isLogged = await isSessionLogged();

  if (isLogged) {
    isLoggedRefresh();
  }
  if (!isLogged) {
    isNotLoggedRefresh();
  }
}

function isLoggedRefresh() {
  elements.logged = {
    logoutBtn: document.getElementById('logout-button'),
  };
  elements.notLogged = {};
}

function isNotLoggedRefresh() {
  elements.logged = {};
  elements.notLogged = {
    loginBtn: document.getElementById('login-button'),
    signupBtn: document.getElementById('signup-button'),
  };
}
