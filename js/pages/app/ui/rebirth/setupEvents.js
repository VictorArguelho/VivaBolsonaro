import { tryRebirth } from '@appGame/gameController.js';
import { elements } from '@appUI/rebirth/elements.js';

export function setup() {
  elements.rebirthBtn.addEventListener('click', tryRebirth);
}
