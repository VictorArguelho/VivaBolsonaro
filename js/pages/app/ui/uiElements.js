export const headerElements = Object.freeze({
  login: document.getElementById("login-button"),
  signup: document.getElementById("signup-button"),

  emailText: document.getElementById("email-text"),
  logout: document.getElementById("logout-button"),

  logged: document.getElementById("logged"),
  notLogged: document.getElementById("not-logged"),
});

export const clickZoneELements = Object.freeze({
  image: document.getElementById("click-image"),
  button: document.getElementById("click-button"),
  counter: document.getElementById("click-count").querySelector(".value"),
  clickIncome: document
    .getElementById("points-per-click")
    .querySelector(".value"),
  idleIncome: document
    .getElementById("points-per-second")
    .querySelector(".value"),
});

export const shopZoneElements = {
  shopZone: document.querySelector('.zone[data-zone="shop"]'),
  upgrades: {},
};

let isUpgradesInitialized = false;

export function getUpgradeElement(upgradeId) {
  if (!isUpgradesInitialized) {
    initializeUpgrades();
  }

  const upgrade = shopZoneElements.upgrades[upgradeId];

  if (!upgrade) {
    console.warn(`Upgrade ${upgradeId} não encontrado`);
  }

  return upgrade;
}

function initializeUpgrades() {
  document.querySelectorAll(".upgrade").forEach((el) => {
    shopZoneElements.upgrades[el.dataset.upgrade] = el;
  });

  isUpgradesInitialized = true;
}