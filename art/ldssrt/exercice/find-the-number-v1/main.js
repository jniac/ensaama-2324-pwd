
import { randFFFFFF } from '../../../../common-resources/js/color-utils.js'

const main = document.querySelector('main')
const arrowUpSource = document.querySelector('.arrow.up')
const arrowDownSource = document.querySelector('.arrow.down')

// La "source" n'est plus nécessaire, on peut la retirer de l'écran:
 arrowUpSource.remove()
 arrowDownSource.remove()



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
addArrowUp(30)

addArrowDown(10)
addArrowDown(30)
