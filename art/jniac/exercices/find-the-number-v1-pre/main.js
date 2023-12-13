import { randFFFFFF } from '../../../../common-resources/js/color-utils.js'

const main = document.querySelector('main')
const arrowSource = document.querySelector('.arrow')

// La "source" n'est plus nécessaire, on peut la retirer de l'écran:
// arrowSource.remove()

function addArrow(y, reversed) {
  const clone = arrowSource.cloneNode(true)
  clone.style.top = `${100 - y}%`
  main.append(clone)

  // random gradient color
  const color = randFFFFFF()
  const linearGradient = `linear-gradient(${color}, ${color}00)`
  clone.querySelector('.right').style.backgroundImage = linearGradient
  clone.querySelector('.left').style.backgroundImage = linearGradient

  // dynamic angle
  const angle = 40 * (y / 100) * (reversed ? -1 : 1)
  clone.style.setProperty('--angle', `${angle}deg`)
}

const hiddenNumber = Math.ceil(Math.random() * 100)

// Un petit cheat quand même:
console.log(`le nombre caché est ${hiddenNumber}`)

function giveATry() {
  const userString = prompt(`Kouakoubeh ?`)
  const userNumber = Number.parseFloat(userString)

  if (userString === null || userString === 'exit') {
    return
  }

  addArrow(userNumber, userNumber > hiddenNumber)

  setTimeout(giveATry, 1000)
}

setTimeout(giveATry, 1000)
