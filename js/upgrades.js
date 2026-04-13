export const upgradeId = Object.freeze({
  UPGRADE_1: "1",
  UPGRADE_2: "2",
  UPGRADE_3: "3",
  UPGRADE_4: "4",
});

const upgrades = {
  [upgradeId.UPGRADE_1]: {
    text: "Aumentar ajuda",
    level: 0,

    startCost: 15,
    multPerLevel: 1.25,

    incomes: {
      click: 1,
      idle: 0,
    },
  },
  [upgradeId.UPGRADE_2]: {
    text: "Aumentar muito a ajuda",
    level: 0,

    startCost: 500,
    multPerLevel: 1.25,

    incomes: {
      click: 0,
      idle: 50,
    },
  },
  [upgradeId.UPGRADE_3]: {
    text: "Aumentar a ajuda pra caralho",
    level: 0,

    startCost: 10000,
    multPerLevel: 1.25,

    incomes: {
      click: 100,
      idle: 0,
    },
  },
  [upgradeId.UPGRADE_4]: {
    text: "Aumentar a ajuda pra caralho platinium+",
    level: 0,

    startCost: 15000,
    multPerLevel: 1.25,

    incomes: {
      click: 0,
      idle: 5000,
    },
  },
};

export function getSave() {
  return upgrades;
}

export function loadSave(save) {
  upgrades = save;
}

export function getUpgradeInfo(upgradeId) {
  const upgrade = upgrades[upgradeId];

  return Object.freeze({
    text: upgrade.text,
    level: upgrade.level,
    incomes: upgrade.incomes,
    cost: getUpgradeCost(upgradeId),
  });
}

export function levelUpUpgrade(upgradeId) {
  if (!upgrades[upgradeId]) return;

  upgrades[upgradeId].level++;
}

export function getUpgradeCost(upgradeId) {
  if (!upgrades[upgradeId]) return;

  const upgrade = upgrades[upgradeId];
  const mult = upgrade.multPerLevel ** upgrade.level;
  const price = upgrade.startCost * mult;
  return Math.floor(price);
}

export function getAllUpgradesIncomes() {
  const allIncomes = {
    click: 0,
    idle: 0,
  };

  for (const id in upgrades) {
    const incomes = getUpgradeIncomes(id);

    allIncomes.click += incomes.click;
    allIncomes.idle += incomes.idle;
  }

  return allIncomes;
}

function getUpgradeIncomes(upgradeId) {
  const upgrade = upgrades[upgradeId];
  const incomes = upgrade.incomes;
  return {
    click: incomes.click * upgrade.level,
    idle: incomes.idle * upgrade.level,
  };
}