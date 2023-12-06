import { randFFFFFF } from "../../../../common-resources/js/color-utils.js"

const main = document.querySelector('main')
const arrowUpSource = document.querySelector('.arrow.up')
const arrowDownSource = document.querySelector('.arrow.down')


arrowUpSource.remove()
arrowDownSource.remove()

// main.onclick = (event) => {
//     const clone = arrowUpSource.cloneNode(true)
//     clone.style.top = `${event.clientY}px`
//     main.append(clone)

//     const color = randFFFFFF()
//     const linearGradient = `linear-gradient(${color}, ${color}00)`
//     clone.querySelector(`.right`).style.backgroundImage = linearGradient
//     clone.querySelector(`.left`).style.backgroundImage = linearGradient

//     const angle = event.y
//     clone.style.setProperty('--angle', `${angle}deg`)

// }

function addArrowUp(y){
    const clone = arrowUpSource.cloneNode(true)
    clone.style.top = `${100 - y}%`
    main.append(clone)

}

function addArrowDown(y){
    const clone = arrowDownSource.cloneNode(true)
    clone.style.bottom = `${100 - y}%`
    main.append(clone)

}


for (let i = 0; i < 20; i++){
    addArrowUp(i * 15)
    addArrowDown(i * 15)
}


