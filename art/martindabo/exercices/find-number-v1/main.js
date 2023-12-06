import { randFF, randFFFFFF } from '../../../../common-resources/js/color-utils.js'

const main = document.querySelector('main')
const arrowUpSource = document.querySelector('.arrow.up')
const arrowDownSource = document.querySelector('.arrow.down')

arrowUpSource.remove()
arrowDownSource.remove()

function addArrowUp(y) {
 
  const clone = arrowUpSource.cloneNode(true)
  clone.style.top = `${100 - y}%`
  main.append(clone)

  // random gradient color
  const color = randFFFFFF()
  const linearGradient = `linear-gradient(
    ${color},
    ${color}00)`
    clone.querySelector('.right').style.backgroundImage = linearGradient
    clone.querySelector('.left').style.backgroundImage = linearGradient

    //dynamic angle
    const angle = (y) / 2
    clone.style.setProperty('--angle', `${angle}deg`)
}

function addArrowDown(y) {
 
  const clone = arrowDownSource.cloneNode(true)
  clone.style.bottom = `${100 - y}%`
  main.append(clone)

  // random gradient color
  const color = randFFFFFF()
  const linearGradient = `linear-gradient(
    ${color}00,
    ${color})`
    clone.querySelector('.right').style.backgroundImage = linearGradient
    clone.querySelector('.left').style.backgroundImage = linearGradient

        //dynamic angle
        const angle = (y) / 2
        clone.style.setProperty('--angle', `${angle}deg`)
}

const max = 20;
for (let i = 0; i < max; i++){
  addArrowUp(i*10)
  addArrowDown(i*10)
}