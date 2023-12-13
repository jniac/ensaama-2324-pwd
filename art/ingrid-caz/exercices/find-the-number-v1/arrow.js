import { lerpFFFFFF } from '../../../../common-resources/js/color-utils.js';

const art = document.querySelector('.art');

const arrowUpSource = document.querySelector('.arrow.up');
const arrowDownSource = document.querySelector('.arrow.down');
arrowUpSource.remove();
arrowDownSource.remove();
const colorA = '#2d0a80';
const colorB = '#7700ff';
const randomLerpColor = () => lerpFFFFFF(colorA, colorB, Math.random());
function addArrowUp(y) {

    const clone = arrowUpSource.cloneNode(true);
    clone.style.top = `${100 - y}%`;
    art.append(clone);

    const color = randomLerpColor();
    const linearGradient = `linear-gradient(${color}, ${color}00)`;
    clone.querySelector('.right').style.backgroundImage = linearGradient;
    clone.querySelector('.left').style.backgroundImage = linearGradient;

}
function addArrowDown(y) {

    const clone = arrowDownSource.cloneNode(true);
    clone.style.top = `${100 - y}%`;
    art.append(clone);

    const color = randomLerpColor();
    const linearGradient = `linear-gradient(${color}, ${color}00)`;
    clone.querySelector('.right').style.backgroundImage = linearGradient;
    clone.querySelector('.left').style.backgroundImage = linearGradient;

}
export function makeArtIntro() {
    for (let i = 0; i < 30; i++) {
        addArrowUp(i * 15);
        addArrowDown(i * 15);

    }
}

export function cleanArt() {
    art.innerHTML = ''
}
