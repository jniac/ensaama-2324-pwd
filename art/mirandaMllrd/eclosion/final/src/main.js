import { initEclosion } from '../../../../../common-projects/eclosion/src/eclosion.js'
import { replaceByExternalRef } from '../../../../../common-projects/eclosion/src/tools.js'
import { clonePetalA } from './clonePetals.js'

export function main() {
  replaceByExternalRef()
  initEclosion('mir')
  
  clonePetalA({
    count: 100,
    radius: 400,
    className: "mdr"
  })
  
  clonePetalA({
    count: 100,
    className: "ext",
    radius: 800,
  })
  
  clonePetalA({
    radius: 40,
  })
}

main()
