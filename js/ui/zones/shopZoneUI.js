import { upgradeId } from "../../game/upgrades/upgradesData.js";
import { getUpgradeElement } from "../uiElements.js";
import { getUpgradeInfo } from "../../game/upgrades/upgradesLogic.js";

export function updateShopZone() {
  for (let id in upgradeId) {
    updateUpgrade(upgradeId[id]);
  }
}

function updateUpgrade(upgradeId) {
  const upgrade = getUpgradeElement(upgradeId);
  const info = getUpgradeInfo(upgradeId);

  upgrade.querySelector(".upgrade-title").textContent = info.text;
  upgrade.querySelector(".cost").textContent = `${info.cost}`;
  upgrade.querySelector(".points-per-click").textContent =
    `+${info.baseIncomes.click}`;
  upgrade.querySelector(".points-per-second").textContent =
    `+${info.baseIncomes.idle}`;
}