import {
  upgradeId,
  upgradesConfig,
  upgradesState,
  setUpgradesState,
} from "./upgradesData.js";

export function getSave() {
  return upgradesState;
}

export function loadSave(save) {
  if (!save) {
    return;
  }

  setUpgradesState(save);
}

export function getUpgradeInfo(upgradeId) {
  const upgradeConfig = upgradesConfig[upgradeId];
  const upgradeState = upgradesState[upgradeId];

  return Object.freeze({
    text: upgradeConfig.text,
    baseCost: upgradeConfig.startCost,
    baseIncomes: upgradeConfig.incomes,

    level: upgradeState.level,
    cost: getUpgradeCost(upgradeId),
    incomes: getUpgradeIncomes(upgradeId),
  });
}

export function getUpgradeCost(upgradeId) {
  const upgradeConfig = upgradesConfig[upgradeId];
  const upgradeState = upgradesState[upgradeId];

  const mult = upgradeConfig.multPerLevel ** upgradeState.level;
  const price = upgradeConfig.startCost * mult;
  return Math.floor(price);
}

export function getAllUpgradesIncomes() {
  const allIncomes = {
    click: 0,
    idle: 0,
  };

  for (const id in upgradeId) {
    const incomes = getUpgradeIncomes(upgradeId[id]);

    allIncomes.click += incomes.click;
    allIncomes.idle += incomes.idle;
  }

  return allIncomes;
}

export function levelUpUpgrade(upgradeId) {
  upgradesState[upgradeId].level++;
}

function getUpgradeIncomes(upgradeId) {
  const incomes = upgradesConfig[upgradeId].incomes;
  const level = upgradesState[upgradeId].level;

  return {
    click: incomes.click * level,
    idle: incomes.idle * level,
  };
}