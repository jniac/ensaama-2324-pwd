import { lerpFFFFFF, randFFFFFF} from '../../../../common-resources/js/color-utils.js'

const main = document.querySelector('main')
const arrowUpSource = document.querySelector('.arrow.up')
const arrowDownSource = document.querySelector('.arrow.down')

arrowUpSource.remove()
arrowDownSource.remove()

const colorA = '#2d0a80'
const colorB = '#7700ff'
const randomLerpColor = () => lerpFFFFFF(colorA, colorB, Math.random())


function addArrowUp (y) {

    const clone = arrowUpSource.cloneNode(true)
    clone.style.top = `${100-y}%`
    main.append(clone)

    const color = randomLerpColor()
    const linearGradient = `linear-gradient(${color}, ${color}00)`
    clone.querySelector('.right').style.backgroundImage = linearGradient
    clone.querySelector('.left').style.backgroundImage = linearGradient

}

function addArrowDown (y) {

    const clone = arrowDownSource.cloneNode(true)
    clone.style.top = `${100-y}%`
    main.append(clone)

    const color = randomLerpColor()
    const linearGradient = `linear-gradient(${color}, ${color}00)`
    clone.querySelector('.right').style.backgroundImage = linearGradient
    clone.querySelector('.left').style.backgroundImage = linearGradient

}
function makeArt(){
    for (let i =0 ; i < 20; i++) {
        addArrowUp(i * 5)
        addArrowDown(i * 5)
    
    }
}

makeArt()