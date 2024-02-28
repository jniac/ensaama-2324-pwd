import { initEclosion } from '../../../../../common-projects/eclosion/src/eclosion.js'
import { replaceByExternalRef } from '../../../../../common-projects/eclosion/src/tools.js'

export function main() {
  replaceByExternalRef()
  initEclosion('jnc')
}

main()