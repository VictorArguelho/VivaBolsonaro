import { click, buyUpgrade } from "../game/gameController.js";
import { upgradeId } from "../game/upgrades/upgradesData.js";
import {
  clickZoneELements,
  getUpgradeElement,
  headerElements,
} from "../ui/uiElements.js";
import { refresh, switchPage } from "../../../pages.js";
import { logout } from "../../../server/services/authentication.js";

export function setupEvents() {
  setupHeaderButtons();
  clickZoneELements.button.addEventListener("click", click);

  for (let id in upgradeId) {
    setupUpgradeClick(upgradeId[id]);
  }
}

function setupUpgradeClick(upgradeId) {
  getUpgradeElement(upgradeId).addEventListener("click", () => {
    buyUpgrade(upgradeId);
  });
}

function setupHeaderButtons() {
  headerElements.login.addEventListener("click", () => {
    switchPage("login");
  });

  headerElements.signup.addEventListener("click", () => {
    switchPage("signup");
  });

  headerElements.logout.addEventListener("click", () => {
    logout();
    refresh();
  });
}
