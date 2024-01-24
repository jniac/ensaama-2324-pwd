import { initEclosion } from '../../../../../common-projects/eclosion/src/eclosion.js'
import { replaceByExternalRef } from '../../../../../common-projects/eclosion/src/tools.js'
import { easings, inverseLerp } from '../../../../../common-resources/js/math-utils.js'

replaceByExternalRef()

initEclosion('jnc', scroll => {
  const element = document.querySelector('.jnc')

  const scroll1 = inverseLerp(0, 0.75, scroll)
  element.style.setProperty('--scroll-1', easings.out3(scroll1))

  const scroll2 = inverseLerp(0.25, 1, scroll)
  element.style.setProperty('--scroll-2', easings.out3(scroll2))
})

function clonePetalA() {
  const petal = document.querySelector('.jnc .petal-a')
  for (let i = 1; i < 4; i++) {
    const clone = petal.cloneNode(true)
    petal.parentElement.append(clone)
    petal.style.setProperty('--angle', `${90 * i}deg`)
  }
}

clonePetalA()