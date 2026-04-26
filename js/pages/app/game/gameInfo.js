const state = {
  totalClicks: 0,
};

export function getSave() {
  return state;
}

export function loadSave(save) {
  state.totalClicks = save?.totalClicks ?? 0;
}

export function computeClick() {
  state.totalClicks++;
}
