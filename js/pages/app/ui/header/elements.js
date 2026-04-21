import { isSessionLogged } from '@services/authentication.js';

export const elements = {
  header: document.querySelector('.nav'),
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
    logoutBtn: document.querySelector('.logout-button'),
  };
  elements.notLogged = {};
}

function isNotLoggedRefresh() {
  elements.logged = {};
  elements.notLogged = {
    loginBtn: document.querySelector('.login-button'),
    signupBtn: document.querySelector('.signup-button'),
  };
}
