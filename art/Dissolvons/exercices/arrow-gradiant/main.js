import { randFFFFFF } from '../../../../common-resources/js/color-utils.js'


const main=document.querySelector('main')

const arrowUp=document.querySelector('.arrow.up')

const arrowDown=document.querySelector('.arrow.down')


arrowDown.remove()
arrowUp.remove()

const colors=[
    '#ff0000',
    '#cc9900',
    '#0000ff',
]

const randomC = () =>{
    const index=Math.floor(Math.random()*colors.length)
    return colors[index]
}
function addArrowUp(y){
    const clone = arrowUpSource.cloneNode(true)
    clone.style.top = `${100 - y}%`
    main.append(clone)

}

