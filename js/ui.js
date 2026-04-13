import { clickZoneELements, getUpgradeElement } from "./elements.js";
import { upgradeId, getUpgradeInfo } from "./upgrades.js";
import { formatNumber } from "./utils/formatNumber.js";
import { getPoints, getPointsVisual } from "./game/points.js";
import { getVisualClick, getVisualIdle } from "./game/income.js";

const contentPaths = {
  happy: "content/HappyBolsonaro.jpg",
  sad: "content/SadBolsonaro.jpg",
};

export function updateUI() {
  updateClickZone();
  updateShopZone();
}

function updateClickZone() {
  clickZoneELements.counter.textContent = formatNumber(getPointsVisual(), 2);
  clickZoneELements.clickIncome.textContent = formatNumber(getVisualClick(), 2);
  clickZoneELements.idleIncome.textContent = formatNumber(getVisualIdle(), 2);

  clickZoneELements.image.src =
    getPoints() === 0 ? contentPaths.sad : contentPaths.happy;
}

function updateShopZone() {
  Object.values(upgradeId).forEach((id) => {
    updateUpgrade(id);
  });
}

function updateUpgrade(upgradeId) {
  const upgrade = getUpgradeElement(upgradeId);
  const info = getUpgradeInfo(upgradeId);

  upgrade.querySelector(".upgrade-title").textContent = info.text;
  upgrade.querySelector(".cost").textContent = `${info.cost}`;
  upgrade.querySelector(".points-per-click").textContent =
    `+${info.incomes.click}`;
  upgrade.querySelector(".points-per-second").textContent =
    `+${info.incomes.idle}`;
}