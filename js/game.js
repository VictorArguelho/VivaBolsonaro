import {
  levelUpUpgrade,
  getUpgradePrice,
  getAllUpgradesEffects,
} from "./upgrades.js";

export const gameState = {
  bolsonaroHelps: 0,

  helpsPerClick: 1,
  helpsPerSecond: 0,
};

export function clicked() {
  gameState.bolsonaroHelps += gameState.helpsPerClick;
}

export function buyUpgrade(upgradeId) {
  const price = getUpgradePrice(upgradeId);
  if (hasEnoughHelps(price)) {
    spendHelp(price);
    levelUpUpgrade(upgradeId);
  }

  recomputeStats();
}

function hasEnoughHelps(value) {
  return gameState.bolsonaroHelps >= value;
}

function spendHelp(value) {
  gameState.bolsonaroHelps -= value;
}

function recomputeStats() {
  gameState.helpsPerClick = 1;
  gameState.helpsPerSecond = 0;

  const upgradeEffects = getAllUpgradesEffects();

  gameState.helpsPerClick += upgradeEffects.clickIncome;
  gameState.helpsPerSecond += upgradeEffects.idleIncome;
}