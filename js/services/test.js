import {
  signUp as serverSignUp,
  login as serverLogin,
  getSession as serverGetsession,
  isSessionLogged as serverIsLogged,
  logout,
} from "./authentication.js";

import { saveGame, loadGame as loadGameData } from "./saves.js";
import { loadSave } from "../game/gameController.js";
import {
  EmailAlreadyInUseException,
  InvalidEmailException,
  WeakPasswordException,
} from "./exceptions/authentication/userExceptions.js";

window.debug = {
  signUp,
  login,
  logout,
  printSession,
  printIsLogged,

  saveGame,
  loadGame,
};

async function signUp(email, password) {
  try {
    const session = await serverSignUp(email, password);
  } catch (exception) {
    console.log(exception.message);
  }
}

async function login(email, password) {
  try {
    const session = await serverLogin(email, password);
  } catch (exception) {
    console.log(exception.message);
  }
}

async function printSession() {
  const session = await serverGetsession();
  console.log(session);
}

async function printIsLogged() {
  const isLogged = await serverIsLogged();
  console.log(isLogged);
}

async function loadGame() {
  loadSave(await loadGameData());
}