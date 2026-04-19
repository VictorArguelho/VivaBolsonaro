import { upgradeId } from '@appGame/upgrades/upgradesData.js';
import { getUpgradeInfo } from '@appGame/upgrades/upgradesLogic.js';
import { elements } from '@appUI/shop/elements.js';

export function render() {
  elements.shop.innerHTML = '<h2 class="zone-title">LOJA</h2>';
  for (const id in upgradeId) {
    const upgrade = createUpgrade(upgradeId[id]);
    elements.shop.innerHTML += upgrade;
  }
}

function createUpgrade(upgradeId) {
  const info = getUpgradeInfo(upgradeId);

  return getUpgradeHTML(
    upgradeId,
    info.text,
    info.baseIncomes.click,
    info.baseIncomes.idle,
    info.baseCost,
  );
}

function getUpgradeHTML(upgradeId, text, click, idle, cost) {
  return `
    <button type="button" class="upgrade" data-upgrade="${upgradeId}">
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
    </button>
  `;
}
