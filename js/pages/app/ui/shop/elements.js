export const elements = {
  upgradesContainer: document.querySelector('.container-upgrades'),
  upgrades: {},
};

let isUpgradesInitialized = false;

export function getUpgrade(upgradeId) {
  if (!isUpgradesInitialized) {
    refresh();
    isUpgradesInitialized = true;
  }

  const upgrade = elements.upgrades[upgradeId];

  if (!upgrade) {
    console.warn(`Upgrade ${upgradeId} não encontrado`);
  }

  return upgrade;
}

export function refresh() {
  elements.upgrades = {};
  document.querySelectorAll('.upgrade').forEach((el) => {
    elements.upgrades[el.dataset.upgrade] = el;
  });
}
