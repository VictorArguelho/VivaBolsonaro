import { renderUpgrades } from "./upgradesUI.js";
import { updateClickZone } from "./zones/clickZoneUI.js";
import { updateShopZone } from "./zones/shopZoneUI.js";

export function start() {
  renderUpgrades();
}

export function update() {
  updateClickZone();
  updateShopZone();
}