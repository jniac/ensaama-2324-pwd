const art = document.querySelector('.art');
const arrowUp = document.querySelector('.arrow.up');
const arrowDown = document.querySelector('.arrow.down');


arrowDown.remove();
arrowUp.remove();


const colors = [
    '#3891D9',
    '#DB7163',
    '#F0AA55',
];
const colors2 = [
    '#ff0000',
    '#cc9900',
    '#697EDB',
];
const randomC = () => {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
};
const randomCo = () => {
    const index = Math.floor(Math.random() * colors2.length);
    return colors2[index];
};
/*main.onclick = (event) => {
    console.log(event.clientX,event.clientY)

    const cloneUp=arrowUp.cloneNode(true)
    const cloneDown=arrowDown.cloneNode(true)
    
    cloneUp.style.top=`${event.clientY}px`
    cloneDown.style.top=`${event.clientY}px`
    main.append(cloneUp)
    main.append(cloneDown)


    //gradient colors
    const color= randomC()
    const linearGradient=`linear-gradient(${color}, ${color}00)`
    cloneUp.querySelector(".left").style.backgroundImage=linearGradient
    cloneUp.querySelector(".right").style.backgroundImage=linearGradient
    cloneDown.querySelector(".left").style.backgroundImage=linearGradient
    cloneDown.querySelector(".right").style.backgroundImage=linearGradient
}*/
function addArrowUp(y) {
    const clone = arrowUp.cloneNode(true);
    clone.style.top = `${100 - y}%`;
    art.append(clone);

    // random gradient color
    const color = randomC();
    const linearGradient = `linear-gradient(${color}, ${color}00)`;
    clone.querySelector('.right').style.backgroundImage = linearGradient;
    clone.querySelector('.left').style.backgroundImage = linearGradient;
}
function addArrowDown(y) {
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
