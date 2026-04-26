import {
  upgradeId,
  incomeType,
  upgradesConfig,
  upgradesState,
  setUpgradesState,
} from '@appGame/upgrades/upgradesData.js';

import { getBonus } from '@appGame/rebirth.js';

export function getSave() {
  return upgradesState;
}

export function loadSave(save) {
  if (!save) {
    return;
  }

  setUpgradesState(save);
}

export function rebirth() {
  for (const i in upgradeId) {
    const id = upgradeId[i];
    upgradesState[id].level = 0;
  }
}

export function getUpgradeInfo(upgradeId) {
  const upgradeConfig = upgradesConfig[upgradeId];
  const upgradeState = upgradesState[upgradeId];

  return Object.freeze({
    text: upgradeConfig.text,
    baseCost: upgradeConfig.startCost,
    incomeType: upgradeConfig.incomeType,
    baseIncome: upgradeConfig.income,

    level: upgradeState.level,
    cost: getUpgradeCost(upgradeId),
    income: getUpgradeIncome(upgradeId),
    totalIncome: getUpgradeTotalIncome(upgradeId),
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
    const income = getUpgradeTotalIncome(upgradeId[id]);
    const type = upgradesConfig[upgradeId[id]].incomeType;

    if (type === incomeType.CLICK) {
      allIncomes.click += income;
    }
    if (type === incomeType.IDLE) {
      allIncomes.idle += income;
    }
  }

  return allIncomes;
}

export function levelUpUpgrade(upgradeId) {
  upgradesState[upgradeId].level++;
}

function getUpgradeTotalIncome(upgradeId) {
  const income = getUpgradeIncome(upgradeId);
  const level = upgradesState[upgradeId].level;

  return income * level;
}

function getUpgradeIncome(upgradeId) {
  return upgradesConfig[upgradeId].income * getBonus();
}
