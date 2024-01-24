import { initEclosion } from '../../../../../common-projects/eclosion/src/eclosion.js'
import { replaceByExternalRef } from '../../../../../common-projects/eclosion/src/tools.js'
import { cloneBigPetal, clonePetalA } from './clonePetalA.js'

replaceByExternalRef()
initEclosion('gra')


clonePetalA()
cloneBigPetal()

