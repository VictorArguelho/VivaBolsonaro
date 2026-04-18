import { click, buyUpgrade } from "../game/gameController.js";
import { upgradeId } from "../game/upgrades/upgradesData.js";
import { clickZoneELements, getUpgradeElement } from "../ui/uiElements.js";

export function setupEvents() {
  clickZoneELements.button.addEventListener("click", click);

  for (let id in upgradeId) {
    setupUpgradeClick(upgradeId[id]);
  }
}

function setupUpgradeClick(upgradeId) {
  getUpgradeElement(upgradeId).addEventListener("click", () => {
    buyUpgrade(upgradeId);
  });
}