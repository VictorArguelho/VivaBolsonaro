import { renderUpgrades } from "./ui/upgradesUI.js";
import { update as updateUI, start as startUI } from "./ui/uiController.js";
import {
  update as updateGame,
  start as startGame,
} from "./game/gameController.js";
import { setupEvents } from "./event-handlers/eventsHandle.js";
import { TICK_TIME } from "../../consts.js";
import { isSessionLogged } from "../../server/services/authentication.js";

window.addEventListener("DOMContentLoaded", start);
export let isLogged = false;

import { start as headerStart } from "./ui/uiHeader.js";
async function start() {
  isLogged = await isSessionLogged();
  startUI();
  setupEvents();
  headerStart();
  await startGame();
  setInterval(update, TICK_TIME);
}

async function update() {
  updateGame();
  await updateUI();
}