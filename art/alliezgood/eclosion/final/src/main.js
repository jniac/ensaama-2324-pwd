import { initEclosion } from '../../../../../common-projects/eclosion/src/eclosion.js'
import { replaceByExternalRef } from '../../../../../common-projects/eclosion/src/tools.js'
import { clonePetalA } from './clonePetals.js'

export function main() {
  replaceByExternalRef()
  initEclosion('all')
  clonePetalA()
}

main()
