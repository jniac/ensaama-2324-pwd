import { lerpFFFFFF } from "../../../../common-resources/js/color-utils.js";

const art = document.querySelector('main');
const arrowUpSource = document.querySelector('.arrow.up');
const arrowDownSource = document.querySelector('.arrow.down');

arrowUpSource.remove();
arrowDownSource.remove();

const colorA = `#00855F`;
const colorB = `#430B5F`;

const randomColorAorB = () => {
    const colors = [colorA, colorB];
    const index = Math.floor(colors.length * Math.random());
    return colors[index];
};

const randomLerpColor = () => {
    return lerpFFFFFF(colorA, colorB, Math.random());
};

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
    for (let i = 0; i < 20; i++) {
        addArrowUp(i * 10);
        addArrowDown(i * 10);
    }
}

export function clearArt() {
    art.innerHTML = ''
}