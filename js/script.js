import { upgradeId } from "./game/upgrades/upgradesData.js";
import { renderUpgrades } from "./game/upgrades/upgradesUI.js";
import {
  getSave as getUpgradesSave,
  loadSave as loadUpgradesSave,
} from "./game/upgrades/upgradesLogic.js";

import { click, buyUpgrade, update } from "./game.js";
import { updateUI } from "./ui.js";
import { clickZoneELements, getUpgradeElement } from "./elements.js";
import { TICK_TIME } from "./consts.js";
import { Timer } from "./utils/timer.js";
import {
  getSave as getPointsSave,
  loadSave as loadPointsSave,
  update as pointsUpdate,
} from "./game/points.js";

import { update as incomeUpdate } from "./game/income.js";

const storageName = "save2";

window.addEventListener("DOMContentLoaded", start);

function start() {
  clickZoneELements.button.addEventListener("click", click);
  renderUpgrades();

  Object.values(upgradeId).forEach((id) => {
    registerUpgradeClickEffect(id);
  });

  setInterval(updateGame, TICK_TIME);

  loadGame();
}

const saveTimer = new Timer(1000);

function updateGame() {
  updateUI();
  update();
  pointsUpdate();
  incomeUpdate();
  saveTimer.update();

  if (saveTimer.isReady()) {
    saveGame();
  }
}

function registerUpgradeClickEffect(upgradeId) {
  getUpgradeElement(upgradeId).addEventListener("click", () => {
    buyUpgrade(upgradeId);
  });
}

function loadGame() {
  const json = localStorage.getItem(storageName);

  if (!json) {
    console.log("Nenhum save encontrado");
    return;
  }

  const data = JSON.parse(json);
  loadPointsSave(data.gameState);
  loadUpgradesSave(data.upgrades);
}

function saveGame() {
  const save = {
    gameState: getPointsSave(),
    upgrades: getUpgradesSave(),
  };
  const json = JSON.stringify(save);
  localStorage.setItem(storageName, json);
}
