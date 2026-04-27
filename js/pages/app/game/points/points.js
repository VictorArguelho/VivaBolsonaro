import { SmoothValue } from '@utils/objects/smoothValue.js';
import { SMOOTH_TIME } from '/js/consts.js';

let state = {
  totalEarned: 0,
  totalSpent: 0,

  points: 0,
  earned: 0,
  spent: 0,
};

const pointsVisual = new SmoothValue(SMOOTH_TIME, state.points);

export function getSave() {
  return {
    totalEarned: state.totalEarned,
    totalSpent: state.totalSpent,

    points: state.points,
    earned: state.earned,
    spent: state.spent,
  };
}

export function loadSave(save) {
  state.totalEarned = save?.totalEarned ?? 0;
  state.totalSpent = save?.totalSpend ?? 0;

  state.points = save?.points ?? 0;
  state.earned = save?.earned ?? 0;
  state.spent = save?.spent ?? 0;

  pointsVisual.setTarget(state.points);
}

export function update(deltaTime) {
  pointsVisual.update(deltaTime);
}

export function rebirth() {
  state.totalEarned += state.earned;
  state.totalSpent += state.spent;

  state.points = 0;
  state.earned = 0;
  state.spent = 0;

  pointsVisual.setTarget(0);
}

export function getPoints() {
  return state.points;
}

export function getPointsVisual() {
  return pointsVisual.getCurrent();
}

export function getTotalEarned() {
  return state.earned + state.totalEarned;
}

export function getTotalSpent() {
  return state.spent + state.totalSpent;
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
