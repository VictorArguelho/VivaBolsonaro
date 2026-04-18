import { signUp, getUser, login } from "./server.js";
import { saveGame, loadGame as loadGameData } from "./saves.js";
import { loadSave } from "../game/gameController.js";

window.debug = {
  signUp,
  login,
  printUser,
  saveGame,
  loadGame,
};

async function loadGame() {
  loadSave(await loadGameData());
}

function printUser() {
  const user = getUser();
  console.log("User:", user);
}
