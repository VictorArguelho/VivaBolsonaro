import { upgradeId } from '@appGame/upgrades/upgradesData.js';
import { getUpgradeInfo } from '@appGame/upgrades/upgradesLogic.js';

import { getUpgrade, refresh } from '@appUI/shop/elements.js';
import { render } from '@appUI/shop/render.js';
import { setup } from '@appUI/shop/setupEvents.js';

export function start() {
  render();
  refresh();
  setup();
}

export function update() {
  for (let id in upgradeId) {
    updateUpgrade(upgradeId[id]);
  }
}

function updateUpgrade(upgradeId) {
  const upgrade = getUpgrade(upgradeId);
  const info = getUpgradeInfo(upgradeId);

  upgrade.querySelector('.upgrade-title').textContent = info.text;
  upgrade.querySelector('.cost').textContent = `${info.cost}`;
  upgrade.querySelector('.points-per-click').textContent =
    `+${info.baseIncomes.click}`;
  upgrade.querySelector('.points-per-second').textContent =
    `+${info.baseIncomes.idle}`;
}
