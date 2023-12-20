import { randFFFFFF } from '../../../../common-resources/js/color-utils.js'


const main=document.querySelector('main')

const arrowSource=document.querySelector('.arrow')

arrowSource.remove()

const colors=[
    '#ff0000',
    '#cc9900',
    '#0000ff',
]

const randomC = () =>{
    const index=Math.floor(Math.random()*colors.length)
    return colors[index]
}

main.onclick = (event) => {
    console.log(event.clientX,event.clientY)

    const clone=arrowSource.cloneNode(true)
    clone.style.top=`${event.clientY}px`
    main.append(clone)


    //gradient colors
    const color= randomC()
    const linearGradient=`linear-gradient(${color}, ${color}00)`
    clone.querySelector(".left").style.backgroundImage=linearGradient
    clone.querySelector(".right").style.backgroundImage=linearGradient
}

