import { upgradeId } from '@appGame/upgrades/upgradesData.js';
import { getUpgradeInfo } from '@appGame/upgrades/upgradesLogic.js';
import { elements } from '@appUI/shop/elements.js';
import { formatNumber } from '@utils/formatNumber.js';
import { incomeType } from '@appGame/upgrades/upgradesData.js';

export function render() {
  for (const id in upgradeId) {
    const upgrade = createUpgrade(upgradeId[id]);
    elements.upgradesContainer.innerHTML += upgrade;
  }
}

function createUpgrade(upgradeId) {
  const info = getUpgradeInfo(upgradeId);

  return getUpgradeHTML(
    upgradeId,
    info.text,
    info.incomeType,
    info.income,
    info.baseCost,
    info.level,
  );
}

function getUpgradeHTML(upgradeId, text, type, income, cost, level) {
  return `
    <button type="button" class="button upgrade" data-upgrade="${upgradeId}">
      <span class="title">${text}</span>

      <div class="info">
        <div class="stats">
          <span class="text income income--${type}">
            ${getIncomeText(type)}      
            <span class="emphasis income-value">${income}</span>
          </span>

          <span class="text">
            Nível:           
            <span class="emphasis level-value">${level}</span>
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

function getIncomeText(type) {
  if (type === incomeType.CLICK) {
    return 'Ajudas por clique:';
  }

  if (type === incomeType.IDLE) {
    return 'Ajudas por segundo:';
  }
}
