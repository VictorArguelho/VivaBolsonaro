import { TICK_TIME } from '/js/consts.js';

import { start as startUI, update as updateUI } from '@appUI/controller.js';
import {
  start as startGame,
  update as updateGame,
} from '@appGame/gameController.js';

window.addEventListener('DOMContentLoaded', start);

async function start() {
  await startUI();
  await startGame();
  setInterval(update, TICK_TIME);
}

async function update() {
  await updateGame();
  await updateUI();
}
