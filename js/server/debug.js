import {
  signUp as serverSignUp,
  login as serverLogin,
  getSession as serverGetsession,
  isSessionLogged as serverIsLogged,
  logout,
} from "./services/authentication.js";

import { setUserData, getUserData } from "./services/database.js";

import { getSave, loadSave } from "../game/gameController.js";

window.debug = {
  signUp,
  login,
  logout,
  session,
  isLogged,

  saveGame,
  loadGame,
};

async function signUp(email, password) {
  try {
    await serverSignUp(email, password);
  } catch (exception) {
    console.log(exception.message);
  }
}

async function login(email, password) {
  try {
    await serverLogin(email, password);
  } catch (exception) {
    console.log(exception.message);
  }
}

async function session() {
  const session = await serverGetsession();
  console.log(session);
}

async function isLogged() {
  const isLogged = await serverIsLogged();
  console.log(isLogged);
}

async function saveGame() {
  try {
    await setUserData("game_saves", getSave());
  } catch (exception) {
    console.log(exception.message);
  }
}

async function loadGame() {
  try {
    await loadSave(await getUserData("game_saves"));
  } catch (exception) {
    console.log(exception.message);
  }
}
