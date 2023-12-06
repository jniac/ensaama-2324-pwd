import { randFFFFFF } from '../../../../common-resources/js/color-utils.js'


const main=document.querySelector('main')

const arrowUp=document.querySelector('.arrow.up')

const arrowDown=document.querySelector('.arrow.down')


arrowDown.remove()
arrowUp.remove()

const colors=[
    '#69C6DB',
    '##697EDB',
    '##69A2DB',
]

const colors2=[
    '#ff0000',
    '#cc9900',
    '#697EDB',
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

const randomCo = () =>{
    const index=Math.floor(Math.random()*colors2.length)
    return colors[index]
}

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
    const clone = arrowUp.cloneNode(true)
    clone.style.top = `${100 - y}%`
    main.append(clone)
  
    // random gradient color
    const color = randomCo()
    const linearGradient = `linear-gradient(${color}, ${color}00)`
    clone.querySelector('.right').style.backgroundImage = linearGradient
    clone.querySelector('.left').style.backgroundImage = linearGradient
  }
  
  function addArrowDown(y) {
    const clone = arrowDown.cloneNode(true)
    clone.style.bottom = `${100 - y}%`
    main.append(clone)
  
    // random gradient color
    const color = randomCo()
    const linearGradient = `linear-gradient(${color}, ${color}00)`
    clone.querySelector('.right').style.backgroundImage = linearGradient
    clone.querySelector('.left').style.backgroundImage = linearGradient
  }
  
  
  
