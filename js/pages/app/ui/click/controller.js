import { formatNumber } from '@utils/formatNumber.js';

import { getPointsVisual, getPoints } from '@appGame/points/points.js';
import { getVisualClick, getVisualIdle } from '@appGame/points/income.js';

import { contentPaths } from '@appUI/data.js';
import { elements } from '@appUI/click/elements.js';
import { setup } from '@appUI/click/setupEvents.js';

export function start() {
  setup();
}

export function update(deltaTime) {
  elements.clickCounter.textContent = formatNumber(getPointsVisual(), 2);
  elements.clickIncome.textContent = formatNumber(getVisualClick(), 2);
  elements.idleIncome.textContent = formatNumber(getVisualIdle(), 2);

  elements.image.src =
    getPoints() === 0 ? contentPaths.SAD : contentPaths.HAPPY;
}
