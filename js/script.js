export const VERSION = "v1.0";

import { upgradeId } from "./upgrades.js";
import { click, buyUpgrade, update} from "./game.js";
import { updateUI } from "./ui.js";
import { clickZoneELements, getUpgradeElement } from "./elements.js";
import { TICK_TIME } from "./consts.js";

window.addEventListener("DOMContentLoaded", start);

function start() {
  clickZoneELements.button.addEventListener("click", click);

  Object.values(upgradeId).forEach((id) => {
    registerUpgradeClickEffect(id);
  });

  setInterval(updateGame, TICK_TIME);
}

function updateGame() {
  updateUI();
  update();
}

function registerUpgradeClickEffect(upgradeId) {
  getUpgradeElement(upgradeId).addEventListener("click", () => {
    buyUpgrade(upgradeId);
  });
}