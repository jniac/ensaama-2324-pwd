import { bud } from './main.js'

export function clonePetalA() {
  const petalA = bud.querySelector('.petal-a')
  for (let i = 1; i < 6; i++) {
    const clone = petalA.cloneNode(true)
    clone.style.setProperty('--angle', `${60 * i}deg`)
    petalA.parentElement.append(clone)
  }
}
export function clonePetalB() {
  const petalB = bud.querySelector('.petal-b')
  for (let i = 1; i < 12; i++) {
    const clone = petalB.cloneNode(true)
    clone.style.setProperty('--angle', `${30 * i}deg`)
    petalB.parentElement.append(clone)
  }
}
