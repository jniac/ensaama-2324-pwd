import { initEclosion } from '../../../../../common-projects/eclosion/src/eclosion.js'
import { replaceByExternalRef } from '../../../../../common-projects/eclosion/src/tools.js'

replaceByExternalRef()
initEclosion('par')

const petal = document.querySelector('.jnc .petal-a')
for (let i = 1; i < 4; i++) {
  const clone = petal.cloneNode(true)
  clone.style.setProperty('--angle', angle) 
}
