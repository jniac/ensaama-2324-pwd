import { initEclosion } from '../../../../../common-projects/eclosion/src/eclosion.js'
import { replaceByExternalRef } from '../../../../../common-projects/eclosion/src/tools.js'
import { clonePetalA } from './clonePetals.js'

export async function main() {
  await replaceByExternalRef()
  initEclosion('jnc')
  clonePetalA()
}

main()
