import { randFFFFFF } from '../../../../common-resources/js/color-utils.js'


const main=document.querySelector('main')

const arrowUp=document.querySelector('.arrow.up')

const arrowDown=document.querySelector('.arrow.down')


const colors=[
    '#CC86B1',
    '#DAF7A6',
    '#CDC4F1', 
]

const randomC = () =>{
    const index=Math.floor(Math.random()*colors.length)
    return colors[index]
}

main.onclick = (event) => {
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
}