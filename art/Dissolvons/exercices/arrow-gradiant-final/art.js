const art = document.querySelector('.art');
const arrowUp = document.querySelector('.arrow.up');
const arrowDown = document.querySelector('.arrow.down');


arrowDown.remove();
arrowUp.remove();


const colors = [
    '#87CEFA',
    '#B0C4DE',
    '#ADD8E6',
];
const colors2 = [
    '#5472AE0',
    '#4682B4',
    '#87CEEB',
];
const randomC = () => {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
};
const randomCo = () => {
    const index = Math.floor(Math.random() * colors2.length);
    return colors2[index];
};

export function addArrowUp(y) {
    const clone = arrowUp.cloneNode(true);
    clone.style.top = `${100 - y}%`;
    art.append(clone);

    // random gradient color
    const color = randomC();
    const linearGradient = `linear-gradient(${color}, ${color}00)`;
    clone.querySelector('.right').style.backgroundImage = linearGradient;
    clone.querySelector('.left').style.backgroundImage = linearGradient;
}
export function addArrowDown(y) {
    const clone = arrowDown.cloneNode(true);
    clone.style.bottom = `${100 - y}%`;
    art.append(clone);

    // random gradient color
    const color = randomC();
    const linearGradient = `linear-gradient(${color}, ${color}00)`;
    clone.querySelector('.right').style.backgroundImage = linearGradient;
    clone.querySelector('.left').style.backgroundImage = linearGradient;
}

export function makeArtIntro() {
    for (let i = 0; i < 20; i++) {
        addArrowUp(i * 5);
        addArrowDown(i * 5);
    }
}

export function clearArt(){
    art.innerHTML=''
}