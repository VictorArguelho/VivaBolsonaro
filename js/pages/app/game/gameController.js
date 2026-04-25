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

import { update as updateLeaderboard } from '@appGame/leaderboard.js';

import { saveGame, loadGame } from '@appGame/saves.js';

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
  };
}

export function loadSave(save) {
  loadSavePoints(save?.points ?? null);
  loadSaveUpgrades(save?.upgrades ?? null);
}

export function click() {
  earnPoints(getClick());
}

export function buyUpgrade(upgradeId) {
  const price = getUpgradeCost(upgradeId);
  if (hasEnoughPoints(price)) {
    trySpendPoints(price);
    levelUpUpgrade(upgradeId);
  }
}
