import { clickZoneELements } from "../uiElements.js";
import { formatNumber } from "../../../../utils/formatNumber.js";
import { getPointsVisual, getPoints } from "../../game/points/points.js";
import { getVisualClick, getVisualIdle } from "../../game/points/income.js";
import { contentPaths } from "../uiConfig.js";

export function updateClickZone() {
  clickZoneELements.counter.textContent = formatNumber(getPointsVisual(), 2);
  clickZoneELements.clickIncome.textContent = formatNumber(getVisualClick(), 2);
  clickZoneELements.idleIncome.textContent = formatNumber(getVisualIdle(), 2);

  clickZoneELements.image.src =
    getPoints() === 0 ? contentPaths.sad : contentPaths.happy;
}