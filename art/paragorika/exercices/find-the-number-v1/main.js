import  {randFFFFFF} from '../../../../common-resources/js/color-utils.js'

const main = document.querySelector('main')
const arrowSource = document.querySelector('.arrow')
const colors = [
    '#C0E7CB',
    '#A4A3F3',
    '#4C52DC',
]
const random =() =>{
    const index=Math.floor(Math.random()*colors.length)
    return colors[index]
}

main.onclick = (event) => {
    console.log(event.clientY)

    const clone = arrowSource.cloneNode(true)
    clone.style.top = `${event.clientY}px`
    main.append(clone)

// random gradient color
const color= randFFFFFF()
const linearGradient = `linear-gradient(${color}, ${color}00)`
clone.querySelector('.right').style.backgroundImage = linearGradient
clone.querySelector('.left').style.backgroundImage = linearGradient
}