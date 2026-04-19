import { click } from '@appGame/gameController.js';
import { elements } from '@appUI/click/elements.js';

export function setup() {
  elements.clickBtn.addEventListener('click', click);
}
