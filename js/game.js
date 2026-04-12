import {
  levelUpUpgrade,
  getUpgradeCost,
  getAllUpgradesIncomes,
} from "./upgrades.js";

import { Value } from "./utils/Value.js";

import { Timer } from "./utils/Timer.js";

export const gameState = Object.freeze({
  get points() {
    return pointsAmount.getValue();
  },
  get visualPoints() {
    return pointsAmount.getSmoothedValue();
  },
  get click() {
    return clickIncome.getValue();
  },

  get visualClick() {
    return clickIncome.getSmoothedValue();
  },
  get idle() {
    return idleIncome.getValue();
  },
  get visualIdle() {
    return idleIncome.getSmoothedValue();
  },
});

const SMOOTH_TIME = 300;

const pointsAmount = new Value(SMOOTH_TIME, 0);
const clickIncome = new Value(SMOOTH_TIME, 1);
const idleIncome = new Value(SMOOTH_TIME, 0);

const idleTimer = new Timer(SMOOTH_TIME);

export function update() {
  pointsAmount.update();
  clickIncome.update();
  idleIncome.update();
  idleTimer.update();

  if (idleTimer.isReady()) {
    pointsAmount.addValue(gameState.idle * (SMOOTH_TIME / 1000));
  }
}

export function click() {
  pointsAmount.addValue(gameState.click);
}

export function buyUpgrade(upgradeId) {
  const price = getUpgradeCost(upgradeId);
  if (hasEnoughPoints(price)) {
    spendPoints(price);
    levelUpUpgrade(upgradeId);
  }

  recomputeIncomes();
}

function hasEnoughPoints(value) {
  return gameState.points >= value;
}

function spendPoints(value) {
  pointsAmount.addValue(-value);
}

function recomputeIncomes() {
  const incomes = getAllUpgradesIncomes();
  clickIncome.setValue(1 + incomes.click);
  idleIncome.setValue(incomes.idle);
}