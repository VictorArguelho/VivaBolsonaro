import { gameState } from "./game.js";
import { upgradeId, getUpgradeInfo } from "./upgrades.js";

export const elements = {
  image: document.getElementById("click-image"),
  button: document.getElementById("click-button"),
  text: document.getElementById("click-count").querySelector(".value"),
  upgrade01: document.querySelector('[data-upgrade="1"]'),
  upgrade02: document.querySelector('[data-upgrade="2"]'),
  upgrade03: document.querySelector('[data-upgrade="3"]'),
  helpsPerClick: document
    .getElementById("points-per-click")
    .querySelector(".value"),
  helpsPerSecond: document
    .getElementById("points-per-second")
    .querySelector(".value"),
};

const paths = {
  happy: "content/HappyBolsonaro.jpg",
  sad: "content/SadBolsonaro.jpg",
};

export function updateDisplay() {
  elements.text.textContent = gameState.bolsonaroHelps;
  elements.image.src = gameState.bolsonaroHelps === 0 ? paths.sad : paths.happy;

  updateUpgrade(elements.upgrade01, upgradeId.UPGRADE_1);
  updateUpgrade(elements.upgrade02, upgradeId.UPGRADE_2);
  updateUpgrade(elements.upgrade03, upgradeId.UPGRADE_3);

  elements.helpsPerClick.textContent = gameState.helpsPerClick;
  elements.helpsPerSecond.textContent = gameState.helpsPerSecond;
}

function updateUpgrade(upgrade, upgradeId) {
  const info = getUpgradeInfo(upgradeId);

  upgrade.querySelector(".upgrade-title").textContent = info.text;
  upgrade.querySelector('[class="points-per-click"]').textContent =
    `+${info.effects.clickIncome}`;
  upgrade.querySelector('[class="points-per-second"]').textContent =
    `+${info.effects.idleIncome}`;
  upgrade.querySelector('[class="cost"]').textContent = `${info.cost}`;
}