import { initEclosion } from "../../../../../common-projects/eclosion/src/eclosion.js";
import { replaceByExternalRef, svgFactory } from "../../../common-projects/eclosion/src/tools.js";
import { clonePetalA } from './clonePetalA.js'

replaceByExternalRef();
initEclosion("rse");


const d = svgFactory.path.polygon(6, 120, { offsetTurn: 1 / 12 })

const hexagone = svgFactory.createNode(`<path d="${d}"/>`)
document.querySelector('.core svg').append(hexagone)

const hexagone1 = svgFactory.createNode(`<path d="${d}"/>`)
document.querySelector('.petals svg').append(hexagone1)

clonePetalA()