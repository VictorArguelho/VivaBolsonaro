import { upgradeId } from "../game/upgrades/upgradesData.js";
import { shopZoneElements } from "./elements.js";
import { getUpgradeInfo } from "../game/upgrades/upgradesLogic.js";

export function renderUpgrades() {
  for (const id in upgradeId) {
    const upgrade = createUpgrade(upgradeId[id]);
    shopZoneElements.shopZone.appendChild(upgrade);
  }
}

function createUpgrade(upgradeId) {
  const upgrade = document.createElement("button");
  const info = getUpgradeInfo(upgradeId);

  upgrade.classList = "upgrade";
  upgrade.dataset.upgrade = upgradeId;
  upgrade.type = "button";
  upgrade.innerHTML = getUpgradeHTML(
    info.text,
    info.baseIncomes.click,
    info.baseIncomes.idle,
    info.baseCost,
  );

  return upgrade;
}

function getUpgradeHTML(text, click, idle, cost) {
  return `
    <span class="upgrade-title">${text}</span>
    <div class="upgrade-info">
      <div>
        <span>Ajudas por clique: </span>
        <strong class="points-per-click">${click}</strong>
      </div>
      <div>
        <span>Ajudas por segundo: </span>
        <strong class="points-per-second">${idle}</strong>
      </div>
      <div>
        <span>Custo: </span>
        <strong class="cost">${cost}</strong>
      </div>
    </div>
  `;
}