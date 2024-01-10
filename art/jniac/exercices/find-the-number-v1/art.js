import { lerpFFFFFF } from '../../../../common-resources/js/color-utils.js'

const art = document.querySelector('.art')

const arrowUpSource = document.querySelector('.arrow.up')
const arrowDownSource = document.querySelector('.arrow.down')

// Les "sources" ne sont plus nécessaires, on peut les retirer de l'écran:
arrowUpSource.remove()
arrowDownSource.remove()

const colorA = '#ff8080'
const colorB = '#2e2edd'

const randomColorAorB = () => {
  const colors = [colorA, colorB]
  const index = Math.floor(colors.length * Math.random())
  return colors[index]
}

const randomLerpColor = () => {
  return lerpFFFFFF(colorA, colorB, Math.random())
}

export function addArrowUp(y) {
  const clone = arrowUpSource.cloneNode(true)
  clone.style.top = `${100 - y}%`
  art.append(clone)

  // random gradient color
  const color = randomLerpColor()
  const linearGradient = `linear-gradient(${color}, ${color}00)`
  clone.querySelector('.right').style.backgroundImage = linearGradient
  clone.querySelector('.left').style.backgroundImage = linearGradient
}

export function addArrowDown(y) {
  const clone = arrowDownSource.cloneNode(true)
  clone.style.bottom = `${100 - y}%`
  art.append(clone)

  // random gradient color
  const color = randomLerpColor()
  const linearGradient = `linear-gradient(${color}00, ${color})`
  clone.querySelector('.right').style.backgroundImage = linearGradient
  clone.querySelector('.left').style.backgroundImage = linearGradient
}

export function makeArtIntro() {
  for (let i = 0; i < 6; i++) {
    addArrowUp(i * 8)
    addArrowDown(i * 8)
  }
}

export function clearArt() {
  art.innerHTML = ''
}

