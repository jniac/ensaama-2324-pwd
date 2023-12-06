import { randFFFFFF } from '../../../../common-resources/js/color-utils.js'


const main = document.querySelector('main')
const arrowUpSource = document.querySelector('.arrow.up')
const arrowDownSource = document.querySelector('.arrow.down')

arrowUpSource.remove()
arrowDownSource.remove()


const color


function addArrowUp(y) {
    const clone = arrowUpSource.cloneNode(true)
    clone.style.top = `${100 - y}%`
    main.append(clone)

    const color = randFFFFFF()
const linearGradient = `linear-gradient(${color}, ${color}00)`
clone.querySelector('.right').style.backgroundImage = linearGradient
clone.querySelector('.left').style.backgroundImage = linearGradient
}



function addArrowDown(y) {
    const clone = arrowDownSource.cloneNode(true)
    clone.style.bottom = `${100 - y}%`
    main.append(clone)
    
    const color = randFFFFFF()
const linearGradient = `linear-gradient(${color}00, ${color})`
clone.querySelector('.right').style.backgroundImage = linearGradient
clone.querySelector('.left').style.backgroundImage = linearGradient
}

for (let i = 0; i < 20; i++) {
    addArrowDown(i * 10)
    addArrowUp(i * 10)
}
