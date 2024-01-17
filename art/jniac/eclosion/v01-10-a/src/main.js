import { initBudScroll } from '../../../../../common-projects/eclosion/src/scroll.js'
import { replaceByExternalRef } from '../../../../../common-projects/eclosion/src/tools.js'
import { easings, mapRange } from '../../../../../common-resources/js/math-utils.js'
import { clonePetalA, clonePetalB, clonePetalC } from './clonePetals.js'
import { initFullsizeSvg } from './fullsizeSvg.js'

await replaceByExternalRef()

// using dynamic imports, because here we are waiting for the external to be replaced before going further.
const { updateBigCircles } = await import('./updateBigCircles.js')
const { updateCoreTriangles } = await import('./updateCoreTriangles.js')

export const bud = document.querySelector('.bud.jnc')

initBudScroll('jnc', scroll => {
  bud.style.setProperty('--scroll1', easings.out2(scroll).toFixed(3))
  bud.style.setProperty('--scroll2', mapRange(scroll, .3, 1, easings.out3).toFixed(3))
  bud.style.setProperty('--scroll3', mapRange(scroll, 0, .8, easings.out2).toFixed(3))
  bud.style.setProperty('--scroll4', mapRange(scroll, .7, 1, easings.out2).toFixed(3))
  bud.style.setProperty('--scroll5', mapRange(scroll, .1, .8, easings.out2).toFixed(3))
  updateCoreTriangles(scroll)
  updateBigCircles(scroll)

  document.querySelector('#intro').classList.toggle('hidden', scroll > .01)
})

initFullsizeSvg()

clonePetalA()
clonePetalB()
clonePetalC()

// Restoring the opacity, once everything has been initialized (to avoid glitches)
document.querySelector('.overlay.jnc').style.removeProperty('opacity')