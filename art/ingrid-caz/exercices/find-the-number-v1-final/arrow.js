import { lerpFFFFFF } from '../../../../common-resources/js/color-utils.js';

const art = document.querySelector('.art');

const arrowUpSource = document.querySelector('.arrow.up');
const arrowDownSource = document.querySelector('.arrow.down');
arrowUpSource.remove();
arrowDownSource.remove();
const colorA = '#e08c53';
const colorB = '#7700ff';
const randomLerpColor = () => lerpFFFFFF(colorA, colorB, Math.random());

export function addArrowUp(y) {

    const clone = arrowUpSource.cloneNode(true);
    clone.style.top = `${100 - y}%`;
    art.append(clone);

    const color = randomLerpColor();
    const linearGradient = `linear-gradient(${color}, ${color}00)`;
    clone.querySelector('.right').style.backgroundImage = linearGradient;
    clone.querySelector('.left').style.backgroundImage = linearGradient;

}
export function addArrowDown(y) {

    const clone = arrowDownSource.cloneNode(true);
    clone.style.bottom = `${100 - y}%`;
    art.append(clone);

    const color = randomLerpColor();
    const linearGradient = `linear-gradient(${color}, ${color}00)`;
    clone.querySelector('.right').style.backgroundImage = linearGradient;
    clone.querySelector('.left').style.backgroundImage = linearGradient;

}
export function makeArtIntro() {
    for (let i = 0; i < 8; i++) {
        addArrowUp(i * 7);
        addArrowDown(i * 7);

    }
}

export function cleanArt() {
    art.innerHTML = ''
}
