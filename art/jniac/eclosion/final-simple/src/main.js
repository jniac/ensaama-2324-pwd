import { debugUpdateRange } from '../../../../../common-projects/eclosion/src/debug.js'
import { initEclosion } from '../../../../../common-projects/eclosion/src/eclosion.js'
import { replaceByExternalRef } from '../../../../../common-projects/eclosion/src/tools.js'
import { inverseLerp } from '../../../../../common-resources/js/math-utils.js'
import { clonePetalA } from './clonePetals.js'

export async function main() {
  await replaceByExternalRef()
  initEclosion('jnc', (scroll, element) => {
    debugUpdateRange('main', 0, 1, scroll)

    debugUpdateRange('1', 0, 0.66, inverseLerp(0, 0.66, scroll), 'red')
    debugUpdateRange('2', 0.33, 1, inverseLerp(0.33, 1, scroll), 'green')
  })
  clonePetalA()
}

main()
