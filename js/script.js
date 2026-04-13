import { upgradeId, getSave as getUpgradeSave, loadSave as loadUpgradeSave } from "./upgrades.js";
import {
  click,
  buyUpgrade,
  update,
  recomputeIncomes,
  getSave as getGameStateSave,
  loadSave as loadGameStateSave
} from "./game.js";
import { updateUI } from "./ui.js";
import { clickZoneELements, getUpgradeElement } from "./elements.js";
import { TICK_TIME } from "./consts.js";
import { Timer } from "./utils/timer.js";

window.addEventListener("DOMContentLoaded", start);

function start() {
  clickZoneELements.button.addEventListener("click", click);

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
  saveTimer.update();

  if(saveTimer.isReady()){
    saveGame();
  }
}

function registerUpgradeClickEffect(upgradeId) {
  getUpgradeElement(upgradeId).addEventListener("click", () => {
    buyUpgrade(upgradeId);
  });
}

function loadGame() {
  const json = localStorage.getItem("save");

  if (!json) {
    console.log("Nenhum save encontrado");
    return;
  }

  const data = JSON.parse(json);
  loadGameStateSave(data.gameState);
  loadUpgradeSave(data.upgrades);
  
  recomputeIncomes();
}

function saveGame() {
  const save = {
    gameState: getGameStateSave(),
    upgrades: getUpgradeSave(),
  };
  const json = JSON.stringify(save);
  localStorage.setItem("save", json);
}