import { initBudScroll } from '../../../../../common-projects/eclosion/scroll.js'
import { replaceByExternalRef } from '../../../../../common-projects/eclosion/tools.js'
import { easings, mapRange } from '../../../../../common-resources/js/math-utils.js'
import { initFullSvg } from './fullSvg.js'

await replaceByExternalRef()

initFullSvg()

const { updateBigCircles } = await import('./updateBigCircles.js')
const { updateCoreTriangles } = await import('./updateCoreTriangles.js')

const bud = document.querySelector('.bud.jnc')

initBudScroll('jnc', scroll => {
  bud.style.setProperty('--scroll1', easings.out2(scroll).toFixed(3))
  bud.style.setProperty('--scroll2', mapRange(scroll, .3, 1, easings.out3).toFixed(3))
  bud.style.setProperty('--scroll3', mapRange(scroll, 0, .8, easings.out2).toFixed(3))
  bud.style.setProperty('--scroll4', mapRange(scroll, .7, 1, easings.out2).toFixed(3))
  updateCoreTriangles(scroll)
  updateBigCircles(scroll)
})

const petalA = bud.querySelector('.petal-a')
for (let i = 1; i < 6; i++) {
  const clone = petalA.cloneNode(true)
  clone.style.setProperty('--angle', `${60 * i}deg`)
  petalA.parentElement.append(clone)
}

const petalB = bud.querySelector('.petal-b')
for (let i = 1; i < 12; i++) {
  const clone = petalB.cloneNode(true)
  clone.style.setProperty('--angle', `${30 * i}deg`)
  petalB.parentElement.append(clone)
}

