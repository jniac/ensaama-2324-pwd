import { initEclosion } from '../../../../../common-projects/eclosion/src/eclosion.js'
import { replaceByExternalRef } from '../../../../../common-projects/eclosion/src/tools.js'

replaceByExternalRef()
initEclosion('kev')

const petal = document.querySelector('.kev .petal-a')
for (let i = 1; i < 4; i++){
  const clone = petal.cloneNode(true)
  clone.style.setProperty('--angle', `${(360/4) * i}deg`)
  petal.parentElement.append(clone)
}