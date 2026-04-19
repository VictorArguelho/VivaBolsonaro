import { buyUpgrade } from '@appGame/gameController.js';
import { upgradeId } from '@appGame/upgrades/upgradesData.js';
import { getUpgrade } from '@appUI/shop/elements.js';

export function setup() {
  for (let id in upgradeId) {
    setupUpgrade(upgradeId[id]);
  }
}

function setupUpgrade(upgradeId) {
  getUpgrade(upgradeId).addEventListener('click', () => {
    buyUpgrade(upgradeId);
  });
}
