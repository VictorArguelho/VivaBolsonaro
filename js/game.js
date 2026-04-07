export let gameState = {
    bolsonaroHelps: 0,
    helpsPerClick: 1,
    upgradeCost: 10
};

export function addHelp() {
    gameState.bolsonaroHelps += gameState.helpsPerClick;
}

export function buyUpgrade() {
    if (gameState.bolsonaroHelps >= gameState.upgradeCost) {
        gameState.bolsonaroHelps -= gameState.upgradeCost;
        gameState.helpsPerClick++;
        return true;
    }
    return false;
}