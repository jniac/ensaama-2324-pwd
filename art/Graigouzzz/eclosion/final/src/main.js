import { initEclosion } from '../../../../../common-projects/eclosion/src/eclosion.js'
import { replaceByExternalRef } from '../../../../../common-projects/eclosion/src/tools.js'
import { cloneBigPetal, clonePetalA } from './clonePetalA.js'

export function main() {
  replaceByExternalRef()
  initEclosion('gra')
  
  clonePetalA()
  cloneBigPetal()
}

main()
