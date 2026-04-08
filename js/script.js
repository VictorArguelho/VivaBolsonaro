const VERSION = "v0.2";

import { upgradeId } from "./upgrades.js";
import { gameState, clicked, buyUpgrade } from "./game.js";
import { elements, updateDisplay } from "./ui.js";

window.addEventListener("DOMContentLoaded", () => {
  setInterval(() => updateDisplay(), 16);

  elements.button.addEventListener("click", clicked);

  elements.upgradeBtn.addEventListener("click", () => {
    buyUpgrade(upgradeId.UPGRADE_1);
  });
});