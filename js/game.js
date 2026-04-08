export const upgradeId = Object.freeze({
  UPGRADE_1: "upgrade1",
});

export const gameState = {
  bolsonaroHelps: 0,

  helpsPerClick: 1,
  helpsPerSecond: 0,
};

export const upgrades = {
  [upgradeId.UPGRADE_1]: {
    text: "Aumentar ajuda",
    level: 0,

    startCost: 10,
    multPerLevel: 1.1,

    effects: {
      clicksIncome: 1,
      idleIncome: 0,
    },
  },
};

export function clicked() {
  gameState.bolsonaroHelps += gameState.helpsPerClick;
}

export function buyUpgrade(upgradeId) {
  const upgrade = upgrades[upgradeId];

  if (!upgrade) return;

  if (hasEnoughHelps(getUpgradePrice(upgrade))) {
    performUpgradeBuy(upgrade);
  }

  recomputeStats();
}

function hasEnoughHelps(value) {
  return gameState.bolsonaroHelps >= value;
}

function spendHelp(value) {
  gameState.bolsonaroHelps -= value;
}

function performUpgradeBuy(upgrade) {
  spendHelp(getUpgradePrice(upgrade));
  upgrade.level++;
}

function getUpgradePrice(upgrade) {
  const mult = upgrade.multPerLevel ** upgrade.level;
  const price = upgrade.startCost * mult;
  return Math.floor(price);
}

function recomputeStats() {
  gameState.helpsPerClick = 1;
  gameState.helpsPerSecond = 0;

  for (const id in upgrades) {
    const upg = upgrades[id];

    gameState.helpsPerClick += upg.effects.clicksIncome * upg.level;
    gameState.helpsPerSecond += upg.effects.idleIncome * upg.level;
  }
}