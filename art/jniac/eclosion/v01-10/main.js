import { initBudScroll } from '../../../../common-projects/eclosion/scroll.js'

initBudScroll('jnc')

const bud = document.querySelector('.bud.jnc')

const petalA = bud.querySelector('.petal-a')
for (let i = 1; i < 3; i++) {
  const clone = petalA.cloneNode(true)
  clone.style.setProperty('--angle', `${120 * i}deg`)
  petalA.parentElement.append(clone)
}
