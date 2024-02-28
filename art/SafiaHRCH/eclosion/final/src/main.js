import { initEclosion } from '../../../../../common-projects/eclosion/src/eclosion.js'
import { replaceByExternalRef } from '../../../../../common-projects/eclosion/src/tools.js'
import { clonePetalA } from './clonePetalA.js'
import { clonePetalB } from './clonePetalB.js'

export function main() {
  replaceByExternalRef()
  initEclosion('sah')
  
  clonePetalB()
  clonePetalA()
}

main()
