import { elements } from '@appUI/rebirth/elements.js';
import { getRebirth, getBonus, getRebithPrice } from '@appGame/rebirth.js';
import { formatNumber } from '@utils/formatNumber.js';
import { setup } from '@appUI/rebirth/setupEvents.js';

export function start() {
  setup();
}

export function update(deltaTime) {
  updateInfo();
}

function updateInfo() {
  elements.currentRebirth.querySelector('.emphasis').textContent = getRebirth();
  elements.currentBonus.querySelector('.emphasis').textContent =
    `${getBonus() * 100 - 100}%`;
  elements.currentPrice.querySelector('.emphasis').textContent =
    formatNumber(getRebithPrice());
}
