import { SmoothValue } from '@utils/objects/smoothValue.js';
import { SMOOTH_TIME } from '/js/consts.js';

let state = {
  points: 0,
  earned: 0,
  spent: 0,
};

const pointsVisual = new SmoothValue(SMOOTH_TIME, state.points);

export function getSave() {
  return {
    points: state.points,
    earned: state.earned,
    spent: state.spent,
  };
}

export function loadSave(save) {
  state.points = save?.points ?? 0;
  state.earned = save?.earned ?? 0;
  state.spent = save?.spent ?? 0;

  pointsVisual.setTarget(state.points);
}

export function update() {
  pointsVisual.update();
}

export function getPoints() {
  return state.points;
}

export function getPointsVisual() {
  return pointsVisual.getCurrent();
}

export function getTotalEarned() {
  return state.earned;
}

export function getTotalSpent() {
  return state.spent;
}

export function getState() {
  return {
    points: state.points,
    pointsVisual: pointsVisual.getCurrent(),
    earned: state.earned,
    spent: state.spent,
  };
}

export function earnPoints(amount) {
  if (amount <= 0) {
    return false;
  }

  state.earned += amount;
  setPoints(state.points + amount);
}

export function trySpendPoints(amount) {
  if (amount <= 0) {
    return false;
  }

  if (!hasEnoughPoints(amount)) {
    return false;
  }

  state.spent += amount;
  setPoints(state.points - amount);

  return true;
}

export function hasEnoughPoints(amount) {
  return state.points >= amount;
}

function setPoints(value) {
  state.points = Math.max(0, value);
  pointsVisual.setTarget(value);
}
