export const elements = Object.freeze({
  image: document.getElementById('click-image'),
  clickBtn: document.getElementById('click-button'),

  clickCounter: document
    .getElementById('click-counter')
    .querySelector('.value'),
  clickIncome: document
    .getElementById('points-per-click')
    .querySelector('.value'),
  idleIncome: document
    .getElementById('points-per-second')
    .querySelector('.value'),
});
