import { gameState } from "./game.js";
import { clickZoneELements, getUpgradeElement } from "./elements.js";
import { upgradeId, getUpgradeInfo } from "./upgrades.js";

const contentPaths = {
  happy: "content/HappyBolsonaro.jpg",
  sad: "content/SadBolsonaro.jpg",
};

export function updateUI() {
  updateClickZone();
  updateShopZone();
}

function updateClickZone() {
  clickZoneELements.counter.textContent = gameState.visualPoints;
  clickZoneELements.clickIncome.textContent = gameState.visualClick;
  clickZoneELements.idleIncome.textContent = gameState.visualIdle;

  clickZoneELements.image.src =
    gameState.points === 0 ? contentPaths.sad : contentPaths.happy;
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