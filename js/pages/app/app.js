import { TICK_TIME } from '/js/consts.js';

import { start as startUI, update as updateUI } from '@appUI/controller.js';
import {
  start as startGame,
  update as updateGame,
} from '@appGame/gameController.js';
import { Loop } from '@utils/objects/loop.js';

import { switchPage } from '../../pages.js';

switchPage('caiu');

window.addEventListener('DOMContentLoaded', start);
const loop = new Loop(33);

async function start() {
  loop.addUpdateCallback(update);
  await startUI();
  await startGame();
  loop.start();
}

async function update(deltaTime) {
  await updateGame(deltaTime);
  await updateUI(deltaTime);
}
