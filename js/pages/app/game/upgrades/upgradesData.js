export const upgradeId = Object.freeze({
  AUMENTAR_AJUDA: '1',
  AUMENTAR_MUITO_AJUDA: '2',
  AUMENTAR_AJUDA_CARALHO: '3',
  AUMENTAR_AJUDA_CARALHO_PLATINIUM: '4',
});

export const upgradesConfig = Object.freeze({
  [upgradeId.AUMENTAR_AJUDA]: Object.freeze({
    text: 'Aumentar ajuda',
    startCost: 15,
    multPerLevel: 1.25,
    incomes: Object.freeze({
      click: 1,
      idle: 0,
    }),
  }),

  [upgradeId.AUMENTAR_MUITO_AJUDA]: Object.freeze({
    text: 'Aumentar muito a ajuda',
    startCost: 500,
    multPerLevel: 1.25,
    incomes: Object.freeze({
      click: 0,
      idle: 50,
    }),
  }),

  [upgradeId.AUMENTAR_AJUDA_CARALHO]: Object.freeze({
    text: 'Aumentar ajuda pra caralho',
    startCost: 10000,
    multPerLevel: 1.25,
    incomes: Object.freeze({
      click: 100,
      idle: 0,
    }),
  }),

  [upgradeId.AUMENTAR_AJUDA_CARALHO_PLATINIUM]: Object.freeze({
    text: 'Aumentar ajuda platinium+',
    startCost: 15000,
    multPerLevel: 1.25,
    incomes: Object.freeze({
      click: 0,
      idle: 5000,
    }),
  }),
});

export let upgradesState = {
  [upgradeId.AUMENTAR_AJUDA]: {
    level: 0,
  },

  [upgradeId.AUMENTAR_MUITO_AJUDA]: {
    level: 0,
  },

  [upgradeId.AUMENTAR_AJUDA_CARALHO]: {
    level: 0,
  },

  [upgradeId.AUMENTAR_AJUDA_CARALHO_PLATINIUM]: {
    level: 0,
  },
};

export function setUpgradesState(newState) {
  upgradesState = newState;
}
