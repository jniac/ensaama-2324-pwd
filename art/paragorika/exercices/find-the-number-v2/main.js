import  {randFFFFFF} from '../../../../common-resources/js/color-utils.js'

const main = document.querySelector('main')
const arrowUpSource = document.querySelector('.arrow.up')
const arrowDownSource = document.querySelector('.arrow.down')

arrowUpSource.remove()
arrowDownSource.remove()

const random =() =>{
    const index=Math.floor(Math.random()*colors.length)
    return colors[index]
}

function addArrowUp(y) {
    const clone = arrowUpSource.cloneNode(true)
    clone.style.top = `${100 - y}%`
    main.append(clone)
}

function addArrowDown(y) {
    const clone = arrowDownSource.cloneNode(true)
    clone.style.bottom = `${100 - y}%`
    main.append(clone)
}

addArrowUp(10)
addArrowUp(20)
addArrowUp(30)
addArrowUp(40)
addArrowUp(50)
addArrowUp(60)
addArrowUp(70)

addArrowDown(10)
addArrowDown(20)
addArrowDown(30)
addArrowDown(40)