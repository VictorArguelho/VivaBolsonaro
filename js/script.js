import { gameState, addHelp, buyUpgrade } from "./game.js";
import { elements, updateDisplay } from "./ui.js";

window.addEventListener("DOMContentLoaded", () => {
  setInterval(() => updateDisplay(gameState), 16);

  elements.button.addEventListener("click", addHelp);

  elements.upgradeBtn.addEventListener("click", buyUpgrade);
});