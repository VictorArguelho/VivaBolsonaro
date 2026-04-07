export const elements = {
    get image() { return document.getElementById('bolsonaro-image'); },
    get button() { return document.getElementById('bolsonaro-help-button'); },
    get text() { return document.getElementById('bolsonaro-helps-text'); },
    get upgradeBtn() { return document.getElementById('upgrade-bolsonaro-click-button'); }
};

const paths = {
    happy: 'content/HappyBolsonaro.jpg',
    sad: 'content/SadBolsonaro.jpg'
};

export function updateDisplay(state) {
        console.log(elements.text);

    elements.text.innerText = `Bolsonaro foi ajudado ${state.bolsonaroHelps} vezes`;
    elements.image.src = (state.bolsonaroHelps === 0) ? paths.sad : paths.happy;
}