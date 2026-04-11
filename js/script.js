const VERSION = "v0.4";

import { upgradeId } from "./upgrades.js";
import { gameState, clicked, buyUpgrade } from "./game.js";
import { elements, updateDisplay } from "./ui.js";

window.addEventListener("DOMContentLoaded", () => {
  setInterval(() => updateDisplay(), 16);

  elements.button.addEventListener("click", clicked);

  elements.upgrade01.addEventListener("click", () => {
    buyUpgrade(upgradeId.UPGRADE_1);
  });

  elements.upgrade02.addEventListener("click", () => {
    buyUpgrade(upgradeId.UPGRADE_2);
  });

  elements.upgrade03.addEventListener("click", () => {
    buyUpgrade(upgradeId.UPGRADE_3);
  });
});