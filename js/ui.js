import { gameState } from "./game.js";
import { upgradeId, getUpgradeText } from "./upgrades.js";

export const elements = {
  image: document.getElementById("bolsonaro-image"),
  button: document.getElementById("bolsonaro-help-button"),
  text: document.getElementById("bolsonaro-helps-text"),
  upgradeBtn: document.getElementById("upgrade-bolsonaro-click-button"),
  helpsPerClick: document.getElementById("helps-per-click"),
  helpsPerSecond: document.getElementById("helps-per-second"),
};

const paths = {
  happy: "content/HappyBolsonaro.jpg",
  sad: "content/SadBolsonaro.jpg",
};

export function updateDisplay() {
  elements.text.innerText = `Bolsonaro foi ajudado ${gameState.bolsonaroHelps} vezes`;
  elements.image.src = gameState.bolsonaroHelps === 0 ? paths.sad : paths.happy;
  elements.upgradeBtn.innerText = getUpgradeText(upgradeId.UPGRADE_1);
  elements.helpsPerClick.innerText = `Ajudas por click: ${gameState.helpsPerClick}`;
  elements.helpsPerSecond.innerText = `Ajudas por segundo: ${gameState.helpsPerSecond}`;
}