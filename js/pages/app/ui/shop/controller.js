import { upgradeId } from '@appGame/upgrades/upgradesData.js';
import { getUpgradeInfo } from '@appGame/upgrades/upgradesLogic.js';

import { getUpgrade, refresh } from '@appUI/shop/elements.js';
import { render } from '@appUI/shop/render.js';
import { setup } from '@appUI/shop/setupEvents.js';

import { formatNumber } from '@utils/formatNumber.js';

export function start() {
  render();
  refresh();
  setup();
}

export function update(deltaTime) {
  for (let id in upgradeId) {
    updateUpgrade(upgradeId[id]);
  }
}

function updateUpgrade(upgradeId) {
  const upgrade = getUpgrade(upgradeId);
  const info = getUpgradeInfo(upgradeId);

  upgrade.querySelector('.cost-value').textContent = `${formatNumber(info.cost, 2)}`;
  upgrade.querySelector('.income-click-value').textContent =
    `+${info.baseIncomes.click}`;
  upgrade.querySelector('.income-idle-value').textContent =
    `+${info.baseIncomes.idle}`;
}
