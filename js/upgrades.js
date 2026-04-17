import { shopZoneElements } from "./elements.js";

export const upgradeId = Object.freeze({
  AUMENTAR_AJUDA: "1",
  AUMENTAR_MUITO_AJUDA: "2",
  AUMENTAR_AJUDA_CARALHO: "3",
  AUMENTAR_AJUDA_CARALHO_PLATINIUM: "4",
});

const upgradesConfig = Object.freeze({
  [upgradeId.AUMENTAR_AJUDA]: Object.freeze({
    text: "Aumentar ajuda",
    startCost: 15,
    multPerLevel: 1.25,
    incomes: Object.freeze({
      click: 1,
      idle: 0,
    }),
  }),

  [upgradeId.AUMENTAR_MUITO_AJUDA]: Object.freeze({
    text: "Aumentar muito a ajuda",
    startCost: 500,
    multPerLevel: 1.25,
    incomes: Object.freeze({
      click: 0,
      idle: 50,
    }),
  }),

  [upgradeId.AUMENTAR_AJUDA_CARALHO]: Object.freeze({
    text: "Aumentar ajuda pra caralho",
    startCost: 10000,
    multPerLevel: 1.25,
    incomes: Object.freeze({
      click: 100,
      idle: 0,
    }),
  }),

  [upgradeId.AUMENTAR_AJUDA_CARALHO_PLATINIUM]: Object.freeze({
    text: "Aumentar ajuda pra caralho platinium+",
    startCost: 15000,
    multPerLevel: 1.25,
    incomes: Object.freeze({
      click: 0,
      idle: 5000,
    }),
  }),
});

let upgradesState = {
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

export function getSave() {
  return upgradesState;
}

export function loadSave(save) {
  upgradesState = save;
}

export function getUpgradeInfo(upgradeId) {
  const upgradeConfig = upgradesConfig[upgradeId];
  const upgradeState = upgradesState[upgradeId];

  return Object.freeze({
    text: upgradeConfig.text,
    level: upgradeState.level,

    cost: getUpgradeCost(upgradeId),
    incomes: getUpgradeIncomes(upgradeId),
  });
}

export function getUpgradeCost(upgradeId) {
  const upgradeConfig = upgradesConfig[upgradeId];
  const upgradeState = upgradesState[upgradeId];

  const mult = upgradeConfig.multPerLevel ** upgradeState.level;
  const price = upgradeConfig.startCost * mult;
  return Math.floor(price);
}

function getUpgradeIncomes(upgradeId) {
  const incomes = upgradesConfig[upgradeId].incomes;
  const level = upgradesState[upgradeId].level;

  return {
    click: incomes.click * level,
    idle: incomes.idle * level,
  };
}

export function levelUpUpgrade(upgradeId) {
  upgradesState[upgradeId].level++;
}

export function getAllUpgradesIncomes() {
  const allIncomes = {
    click: 0,
    idle: 0,
  };

  for (const id in upgradeId) {
    const incomes = getUpgradeIncomes(upgradeId[id]);

    allIncomes.click += incomes.click;
    allIncomes.idle += incomes.idle;
  }

  return allIncomes;
}

export function renderUpgrades() {
  Object.values(upgradeId).forEach((uId) =>
    shopZoneElements.shopZone.appendChild(createUpgrade(uId)),
  );
}

function createUpgrade(upgradeId) {
  const upgrade = document.createElement("button");
  const info = getUpgradeInfo(upgradeId);

  upgrade.classList = "upgrade";
  upgrade.dataset.upgrade = upgradeId;
  upgrade.type = "button";
  upgrade.innerHTML = getUpgradeHTML(
    info.text,
    info.incomes.click,
    info.incomes.idle,
    info.cost,
  );

  return upgrade;
}

function getUpgradeHTML(text, click, idle, cost) {
  return `
    <span class="upgrade-title">${text}</span>
    <div class="upgrade-info">
      <div>
        <span>Ajudas por clique: </span>
        <strong class="points-per-click">${click}</strong>
      </div>
      <div>
        <span>Ajudas por segundo: </span>
        <strong class="points-per-second">${idle}</strong>
      </div>
      <div>
        <span>Custo: </span>
        <strong class="cost">${cost}</strong>
      </div>
    </div>
  `;
}