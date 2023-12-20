import { lerpFFFFFF } from '../../../../common-resources/js/color-utils.js';

const art = document.querySelector('.art');

const arrowUpSource = document.querySelector('.arrow.up');
const arrowDownSource = document.querySelector('.arrow.down');

// Les "sources" ne sont plus nécessaires, on peut les retirer de l'écran:
arrowUpSource.remove();
arrowDownSource.remove();

const colorA = '#a9aaea';
const colorB = '#a1d9ea';
const colorC = '#de9bb9';

const randomLerpColor = () => {
  return lerpFFFFFF(colorA, colorB,colorC, Math.random());
};

function addArrowUp(y) {
  const clone = arrowUpSource.cloneNode(true);
  clone.style.top = `${100 - y}%`;
  art.append(clone);

  // random gradient color
  const color = randomLerpColor();
  const linearGradient = `linear-gradient(${color}, ${color}00)`;
  clone.querySelector('.right').style.backgroundImage = linearGradient;
  clone.querySelector('.left').style.backgroundImage = linearGradient;
}

function addArrowDown(y) {
  const clone = arrowDownSource.cloneNode(true);
  clone.style.bottom = `${100 - y}%`;
  art.append(clone);

  // random gradient color
  const color = randomLerpColor();
  const linearGradient = `linear-gradient(${color}, ${color}00)`;
  clone.querySelector('.right').style.backgroundImage = linearGradient;
  clone.querySelector('.left').style.backgroundImage = linearGradient;
}

export function makeArtIntro() {
  for (let i = 0; i < 40; i++) {
    addArrowUp(i * 5);
    addArrowDown(i * 5);
  }

}


export function clearArt() {
  art.innerHTML = ''
}