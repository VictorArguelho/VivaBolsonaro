import {
  rebirth as pointsRebirth,
  hasEnoughPoints,
} from '@appGame/points/points.js';

import { rebirth as upgradesRebirth } from '@appGame/upgrades/upgradesLogic.js';

const state = {
  rebirth: 0,
  bonus: 1,
};

const basePrice = 1000000;
const priceMult = 1.5;
const bonusPerRebirth = 0.25;

export function getSave() {
  return {
    rebirth: state.rebirth,
    bonus: state.bonus,
  };
}

export function loadSave(save) {
  state.rebirth = save?.rebirth ?? 0;
  state.bonus = save?.bonus ?? 1;
}

export function getRebirth() {
  return state.rebirth;
}

export function getBonus() {
  return state.bonus;
}

export function getRebithPrice() {
  const mult = priceMult ** state.rebirth;
  return basePrice * mult;
}

export function tryRebirth() {
  if (hasEnoughPoints(getRebithPrice())) {
    rebirth();
    upgradesRebirth();
  }
}

function rebirth() {
  pointsRebirth();
  state.bonus += bonusPerRebirth;
  state.rebirth++;
}
