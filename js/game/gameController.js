import {
  levelUpUpgrade,
  getUpgradeCost,
  getSave as getSaveUpgrades,
  loadSave as loadSaveUpgrades,
} from "./upgrades/upgradesLogic.js";
import {
  earnPoints,
  trySpendPoints,
  hasEnoughPoints,
  getSave as getSavePoints,
  loadSave as loadSavePoints,
  update as updatePoints,
} from "./points/points.js";
import { getClick, getIdle, update as updateIncomes } from "./points/income.js";
import { Timer } from "../utils/objects/timer.js";
import { TICK_TIME, GAME_SAVE_KEY } from "../consts.js";
import { saveData, loadData } from "../utils/storage.js";

const idleTimer = new Timer(TICK_TIME);
const saveTimer = new Timer(10000);

export function start() {
  loadSave(loadData(GAME_SAVE_KEY));
}

export function update() {
  updatePoints();
  updateIncomes();

  idleTimer.update();
  saveTimer.update();

  if (idleTimer.isReady()) {
    earnPoints(getIdle() * (TICK_TIME / 1000));
  }

  if (saveTimer.isReady()) {
    saveData(GAME_SAVE_KEY, getSave());
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