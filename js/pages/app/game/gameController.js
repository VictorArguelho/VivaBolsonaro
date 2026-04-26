import { Timer } from '@utils/objects/timer.js';

import {
  levelUpUpgrade,
  getUpgradeCost,
  getSave as getSaveUpgrades,
  loadSave as loadSaveUpgrades,
} from '@appGame/upgrades/upgradesLogic.js';

import {
  earnPoints,
  trySpendPoints,
  hasEnoughPoints,
  getSave as getSavePoints,
  loadSave as loadSavePoints,
  update as updatePoints,
} from '@appGame/points/points.js';

import {
  getClick,
  getIdle,
  update as updateIncomes,
} from '@appGame/points/income.js';

import {
  getSave as getSaveRebirth,
  loadSave as loadSaveRebirth,
  tryRebirth as tryDoRebirth,
} from '@appGame/rebirth.js';

import { update as updateLeaderboard } from '@appGame/leaderboard.js';

import { saveGame, loadGame } from '@appGame/saves.js';

import { computeClick, getSave as getSaveGameInfo, loadSave as loadSaveGameInfo } from '@appGame/gameInfo.js';

const saveTimer = new Timer(60000);
const leaderboardTimer = new Timer(30000);

export async function start() {
  await loadGame();
}

export async function update(deltaTime) {
  updatePoints(deltaTime);
  updateIncomes(deltaTime);

  saveTimer.update(deltaTime);
  leaderboardTimer.update(deltaTime);

  earnPoints(getIdle() * (deltaTime / 1000));

  if (saveTimer.isReady()) {
    await saveGame();
  }

  if (leaderboardTimer.isReady()) {
    await updateLeaderboard();
  }
}

export function getSave() {
  return {
    points: getSavePoints(),
    upgrades: getSaveUpgrades(),
    rebirth: getSaveRebirth(),
    info: getSaveGameInfo(),
  };
}

export function loadSave(save) {
  loadSavePoints(save?.points ?? null);
  loadSaveUpgrades(save?.upgrades ?? null);
  loadSaveRebirth(save?.rebirth ?? null);
  loadSaveGameInfo(save?.info ?? null);
}

export function click() {
  earnPoints(getClick());
  computeClick();
}

export function buyUpgrade(upgradeId) {
  const price = getUpgradeCost(upgradeId);
  if (hasEnoughPoints(price)) {
    trySpendPoints(price);
    levelUpUpgrade(upgradeId);
  }
}

export function tryRebirth() {
  tryDoRebirth();
}
