import { upgradeId } from '@appGame/upgrades/upgradesData.js';
import { getUpgradeInfo } from '@appGame/upgrades/upgradesLogic.js';
import { elements } from '@appUI/shop/elements.js';
import { formatNumber } from '@utils/formatNumber.js';

export function render() {
  elements.shop.innerHTML = '<h2 class="title">LOJA</h2>';
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
    <button type="button" class="button upgrade" data-upgrade="${upgradeId}">
      <span class="title">${text}</span>

      <div class="info">
        <div class="stats">
          <span class="text">
            Ajudas por clique:           
            <span class="emphasis income-click-value">${click}</span>
          </span>

          <span class="text">
            Ajudas por segundo:           
            <span class="emphasis income-idle-value">${idle}</span>
          </span>

          <span class="text">
            Custo:           
            <span class="emphasis cost-value">${formatNumber(cost, 2)}</span>
          </span>
        </div>

        
      </div>
    </button>
  `;
}
