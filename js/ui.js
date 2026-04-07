export const elements = { 
    image: document.getElementById('bolsonaro-image'), 
    button: document.getElementById('bolsonaro-help-button'), 
    text: document.getElementById('bolsonaro-helps-text'), 
    upgradeBtn: document.getElementById('upgrade-bolsonaro-click-button') 
};

const paths = {
    happy: 'content/HappyBolsonaro.jpg',
    sad: 'content/SadBolsonaro.jpg'
};

export function updateDisplay(state) {
    elements.text.innerText = `Bolsonaro foi ajudado ${state.bolsonaroHelps} vezes`;
    elements.image.src = (state.bolsonaroHelps === 0) ? paths.sad : paths.happy;
}