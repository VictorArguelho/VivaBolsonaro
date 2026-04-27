export const upgradeId = Object.freeze({
  PORTE_ARMA: '1',
  CLOROQUINA_BOOST: '2',
  CAMPANHA_BOLSONARISTA: '3',
  ISENCAO_JETSKY: '4',
  DIVULGACAO_ZAP: '5',
  ESPALHAR_PANFLETOS: '6',
  CAMISA_SELECAO: '7',
  FAMILIA_TRADICIONAL: '8',
  PASSEATA_BOLSONARISTA: '9'
});

export const incomeType = Object.freeze({
  CLICK: 'click',
  IDLE: 'idle',
});

export const upgradesConfig = Object.freeze({
  [upgradeId.PORTE_ARMA]: Object.freeze({
    text: 'Apoiar porte de arma',
    startCost: 30,
    multPerLevel: 1.35,
    incomeType: incomeType.CLICK,
    income: 1,
  }),

  [upgradeId.CLOROQUINA_BOOST]: Object.freeze({
    text: 'Coloroquina boost',
    startCost: 300,
    multPerLevel: 1.25,
    incomeType: incomeType.IDLE,
    income: 15,
  }),

  [upgradeId.CAMPANHA_BOLSONARISTA]: Object.freeze({
    text: 'Campanha bolsonarista',
    startCost: 1000,
    multPerLevel: 1.2,
    incomeType: incomeType.CLICK,
    income: 5,
  }),

  [upgradeId.ISENCAO_JETSKY]: Object.freeze({
    text: 'Isenção de Jet Skis',
    startCost: 5000,
    multPerLevel: 1.19,
    incomeType: incomeType.IDLE,
    income: 75,
  }),

  [upgradeId.DIVULGACAO_ZAP]: Object.freeze({
    text: 'Divulgação no Zap',
    startCost: 10000,
    multPerLevel: 1.18,
    incomeType: incomeType.CLICK,
    income: 25,
  }),

  [upgradeId.ESPALHAR_PANFLETOS]: Object.freeze({
    text: 'Espalhar Panfletos',
    startCost: 25000,
    multPerLevel: 1.17,
    incomeType: incomeType.IDLE,
    income: 150,
  }),

  [upgradeId.CAMISA_SELECAO]: Object.freeze({
    text: 'Camiseta da seleção',
    startCost: 50000,
    multPerLevel: 1.15,
    incomeType: incomeType.CLICK,
    income: 100,
  }),

  [upgradeId.FAMILIA_TRADICIONAL]: Object.freeze({
    text: 'Familia tradicional brasileira',
    startCost: 500000,
    multPerLevel: 1.15,
    incomeType: incomeType.IDLE,
    income: 1000,
  }),

  [upgradeId.PASSEATA_BOLSONARISTA]: Object.freeze({
    text: 'Passeata bolsonarista',
    startCost: 1500000,
    multPerLevel: 1.15,
    incomeType: incomeType.CLICK,
    income: 750,
  }),
});

export let upgradesState = {
  [upgradeId.PORTE_ARMA]: {
    level: 0,
  },

  [upgradeId.CLOROQUINA_BOOST]: {
    level: 0,
  },

  [upgradeId.CAMPANHA_BOLSONARISTA]: {
    level: 0,
  },

  [upgradeId.ISENCAO_JETSKY]: {
    level: 0,
  },

  [upgradeId.DIVULGACAO_ZAP]: {
    level: 0,
  },

  [upgradeId.ESPALHAR_PANFLETOS]: {
    level: 0,
  },

  [upgradeId.CAMISA_SELECAO]: {
    level: 0,
  },

  [upgradeId.FAMILIA_TRADICIONAL]: {
    level: 0,
  },

  [upgradeId.PASSEATA_BOLSONARISTA]: {
    level: 0,
  },
};

export function setUpgradesState(newState) {
  if (!newState) {
    return;
  }

  for (const i in upgradeId) {
    const id = upgradeId[i];
    const newIdState = newState[id];

    if (newIdState) {
      upgradesState[id].level = newIdState.level;
    } else {
      upgradesState[id].level = 0;
    }
  }
}
