import {
  levelUpUpgrade,
  getUpgradeCost,
} from "./upgrades.js";

import { earnPoints, trySpendPoints, hasEnoughPoints } from "./game/points.js";

import { getClick, getIdle } from "./game/income.js";

import { Timer } from "./utils/timer.js";
import { TICK_TIME } from "./consts.js";

const idleTimer = new Timer(TICK_TIME);

export function update() {
  idleTimer.update();

  if (idleTimer.isReady()) {
     earnPoints(getIdle() * (TICK_TIME / 1000));
  }
}

export function click() {
  earnPoints(getClick())
}

export function buyUpgrade(upgradeId) {
  const price = getUpgradeCost(upgradeId);
  if (hasEnoughPoints(price)) {
    trySpendPoints(price);
    levelUpUpgrade(upgradeId);
  }
}