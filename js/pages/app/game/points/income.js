import { SmoothValue } from '@utils/objects/smoothValue.js';
import { SMOOTH_TIME } from '/js/consts.js';
import { getAllUpgradesIncomes } from '@appGame/upgrades/upgradesLogic.js';

const clickVisual = new SmoothValue(SMOOTH_TIME, 1);
const idleVisual = new SmoothValue(SMOOTH_TIME, 0);

export function update(deltaTime) {
  clickVisual.update(deltaTime);
  idleVisual.update(deltaTime);

  updateVisuals();
}

export function getClick() {
  return calcIncomes().click;
}

export function getIdle() {
  return calcIncomes().idle;
}

export function getVisualClick() {
  return clickVisual.getCurrent();
}

export function getVisualIdle() {
  return idleVisual.getCurrent();
}

function updateVisuals() {
  const incomes = calcIncomes();
  clickVisual.setTarget(incomes.click);
  idleVisual.setTarget(incomes.idle);
}

function calcIncomes() {
  return {
    click: calcClick() + 1,
    idle: calcIdle(),
  };
}

function calcClick() {
  return getAllUpgradesIncomes().click;
}

function calcIdle() {
  return getAllUpgradesIncomes().idle;
}
