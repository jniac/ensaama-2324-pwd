import { initEclosion } from "../../../common-projects/eclosion/src/eclosion.js";
import { replaceByExternalRef, svgFactory } from "../../../common-projects/eclosion/src/tools.js";
import { clamp, inverseLerp } from "../../../common-resources/js/math-utils.js";
import { clonePetalA } from './clonePetalA.js'

/** @type {HTMLElement} */
const root = document.querySelector('.rse')

replaceByExternalRef();
initEclosion("rse", scroll => {
  root.style.setProperty('--scroll-1', inverseLerp(0.0, 0.5, scroll).toFixed(3))
  root.style.setProperty('--scroll-2', inverseLerp(0.485, 1, scroll).toFixed(3))
  root.style.setProperty('--scroll-big', (inverseLerp(0.5, 1, scroll) * 2).toFixed(3))
})


const d = svgFactory.path.polygon(6, 120, { offsetTurn: 1 / 12 })

const hexagone = svgFactory.createNode(`<path d="${d}"/>`)
document.querySelector('.core svg').append(hexagone)

const hexagone1 = svgFactory.createNode(`<path d="${d}"/>`)
document.querySelector('.petals svg').append(hexagone1)

const hexagoneBig = svgFactory.createNode(`<path d="${d}"/>`)
document.querySelector('.big-petal svg').append(hexagoneBig)

clonePetalA()