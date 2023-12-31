import { randFF, randFFFFFF } from '../../../../common-resources/js/color-utils.js'

const main = document.querySelector('main')
const arrowSource = document.querySelector('.arrow')

main.onclick = (event) => {
  console.log(event.clientY)
 
  const clone = arrowSource.cloneNode(true)
  clone.style.top = `${event.clientY}px`
  main.append(clone)

  // random gradient color
  const color = randFFFFFF()
  const linearGradient = `linear-gradient(
    ${color},
    ${color}00)`
    clone.querySelector('.right').style.backgroundImage = linearGradient
    clone.querySelector('.left').style.backgroundImage = linearGradient

    //dynamic angle
    const angle = (event.y) / 10
    clone.style.setProperty('--angle', `${angle}deg`)
}