import {
  levelUpUpgrade,
  getUpgradeCost,
  getAllUpgradesIncomes,
} from "./upgrades.js";

import { earnPoints, spendPoints, hasEnoughPoints } from "./game/points.js";

import { Value } from "./utils/value.js";

import { Timer } from "./utils/timer.js";

export const gameState = Object.freeze({
  get click() {
    return clickIncome.getValue();
  },
  get idle() {
    return idleIncome.getValue();
  },

  get visualClick() {
    return clickIncome.getSmoothedValue();
  },
  get visualIdle() {
    return idleIncome.getSmoothedValue();
  },
});

const SMOOTH_TIME = 300;

const clickIncome = new Value(SMOOTH_TIME, 1);
const idleIncome = new Value(SMOOTH_TIME, 0);

const idleTimer = new Timer(SMOOTH_TIME);

export function update() {
  clickIncome.update();
  idleIncome.update();
  idleTimer.update();

  if (idleTimer.isReady()) {
     earnPoints(gameState.idle * (SMOOTH_TIME / 1000));
  }
}

export function click() {
  earnPoints(gameState.click)
}

export function buyUpgrade(upgradeId) {
  const price = getUpgradeCost(upgradeId);
  if (hasEnoughPoints(price)) {
    spendPoints(price);
    levelUpUpgrade(upgradeId);
  }

  recomputeIncomes();
}

export function recomputeIncomes() {
  const incomes = getAllUpgradesIncomes();
  clickIncome.setValue(1 + incomes.click);
  idleIncome.setValue(incomes.idle);
}
