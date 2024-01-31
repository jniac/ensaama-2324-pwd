import { initEclosion } from '../../../../../common-projects/eclosion/src/eclosion.js'
import { replaceByExternalRef } from '../../../../../common-projects/eclosion/src/tools.js'
import { clonePetalA, clonePetalB } from './clonePetals.js'

replaceByExternalRef()
initEclosion('lds')

clonePetalA()
clonePetalB()