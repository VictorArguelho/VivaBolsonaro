import { render } from "./ui/shop/render.js";
import { start as startUI, update as updateUI } from "./ui/controller.js";
import {
  update as updateGame,
  start as startGame,
} from "./game/gameController.js";
import { TICK_TIME } from "../../consts.js";
import { isSessionLogged } from "../../server/services/authentication.js";

window.addEventListener("DOMContentLoaded", start);

async function start() {
  await startUI();
  await startGame();
  setInterval(update, TICK_TIME);
}

async function update() {
  await updateGame();
  await updateUI();
}