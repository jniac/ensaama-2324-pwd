import { initEclosion } from '../../../../../common-projects/eclosion/src/eclosion.js'
import { replaceByExternalRef } from '../../../../../common-projects/eclosion/src/tools.js'
import { clonePetal } from './clonePetal.js'

replaceByExternalRef()
initEclosion('cxs')
clonePetal()
cloneSepal()

export function cloneSepal() {
  const sepal = document.querySelector('.cxs .sepal');
  for (let i = 1; i < 15; i++) {
    const clone = sepal.cloneNode(true);
    clone.style.setProperty('--angle', `${(360 / 15) * i}deg`);
    sepal.parentElement.append(clone);
  }
}
