import { randFFFFFF } from '../../../../common-resources/js/color-utils.js'

const main = document.querySelector('main')
const arrowSource = document.querySelector('.arrow')

// La "source" n'est plus nécessaire, on peut la retirer de l'écran:
arrowSource.remove()

main.onclick = (event) => {
  const clone = arrowSource.cloneNode(true)
  clone.style.top = `${event.y}px`
  main.append(clone)

  // random gradient color
  const color = randFFFFFF()
  const linearGradient = `linear-gradient(${color}, ${color}00)`
  clone.querySelector('.right').style.backgroundImage = linearGradient
  clone.querySelector('.left').style.backgroundImage = linearGradient

  // dynamic angle
  const angle = 40 * (event.y / window.innerWidth)
  clone.style.setProperty('--angle', `${angle}deg`)
}

