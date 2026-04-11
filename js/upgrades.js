export const upgradeId = Object.freeze({
  UPGRADE_1: "upgrade1",
  UPGRADE_2: "upgrade2",
  UPGRADE_3: "upgrade3",
});

const upgrades = {
  [upgradeId.UPGRADE_1]: {
    text: "Aumentar ajuda",
    level: 0,

    startCost: 15,
    multPerLevel: 1.28,

    effects: {
      clickIncome: 1,
      idleIncome: 0,
    },
  },
  [upgradeId.UPGRADE_2]: {
    text: "Aumentar muito a ajuda",
    level: 0,

    startCost: 700,
    multPerLevel: 1.28,

    effects: {
      clickIncome: 15,
      idleIncome: 0,
    },
  },
  [upgradeId.UPGRADE_3]: {
    text: "Aumentar a ajuda pra caralho",
    level: 0,

    startCost: 10000,
    multPerLevel: 1.28,

    effects: {
      clickIncome: 75,
      idleIncome: 0,
    },
  },
};

export function levelUpUpgrade(upgradeId) {
  if (!upgrades[upgradeId]) return;

  upgrades[upgradeId].level++;
}

export function getUpgradePrice(upgradeId) {
  if (!upgrades[upgradeId]) return;

  const upgrade = upgrades[upgradeId];
  const mult = upgrade.multPerLevel ** upgrade.level;
  const price = upgrade.startCost * mult;
  return Math.floor(price);
}

export function getAllUpgradesEffects() {
  const allEffects = {
    clickIncome: 0,
    idleIncome: 0,
  };

  for (const id in upgrades) {
    const effects = getUpgradeEffects(id);

    allEffects.clickIncome += effects.clickIncome;
    allEffects.idleIncome += effects.idleIncome;
  }

  return allEffects;
}

export function getUpgradeInfo(upgradeId) {
  const upgrade = upgrades[upgradeId];
  return {
    text: upgrade.text,
    effects: upgrade.effects,
    cost: getUpgradePrice(upgradeId),
  };
}

function getUpgradeEffects(upgradeId) {
  const upgrade = upgrades[upgradeId];
  const effects = upgrade.effects;
  return {
    clickIncome: effects.clickIncome * upgrade.level,
    idleIncome: effects.idleIncome * upgrade.level,
  };
}