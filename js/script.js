import { gameState, upgradeId, clicked, buyUpgrade } from "./game.js";
import { elements, updateDisplay } from "./ui.js";

window.addEventListener("DOMContentLoaded", () => {
  setInterval(() => updateDisplay(gameState), 16);

  elements.button.addEventListener("click", clicked);

  elements.upgradeBtn.addEventListener("click", () => {buyUpgrade(upgradeId.UPGRADE_1)});
});