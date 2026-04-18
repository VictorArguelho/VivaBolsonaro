import { renderUpgrades } from "./ui/upgradesUI.js";
import { update as updateUI, start as startUI } from "./ui/uiController.js";
import {
  update as updateGame,
  start as startGame,
} from "./game/gameController.js";
import { setupEvents } from "./event-handlers/eventsHandle.js";
import { TICK_TIME } from "./consts.js";

window.addEventListener("DOMContentLoaded", start);

function start() {
  startUI();
  setupEvents();
  startGame();
  setInterval(update, TICK_TIME);
}

function update() {
  updateGame();
  updateUI();
}