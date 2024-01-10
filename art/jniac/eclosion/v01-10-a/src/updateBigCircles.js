import { easings, mapRange } from '../../../../../common-resources/js/math-utils.js'

/** @type {SVGElement[]} */
const bigCircles = [...document.querySelectorAll('svg.full circle')]
export function updateBigCircles(scroll) {
  const [c1, c2, c3] = bigCircles

  let t1, t2

  t1 = 0.5
  t2 = 0.8
  c1.style.opacity = mapRange(scroll, t1, t2)
  c1.style.transform = `scale(${mapRange(scroll, 0, t1, t2, 1, easings.out2)})`


  t1 = 0.6
  t2 = 0.9
  c2.style.opacity = mapRange(scroll, t1, t2)
  c2.style.transform = `scale(${mapRange(scroll, 0, t1, t2, 1, easings.out2)})`

  t1 = 0.7
  t2 = 1
  c3.style.opacity = mapRange(scroll, t1, t2)
  c3.style.transform = `scale(${mapRange(scroll, 0, t1, t2, 1, easings.out2)})`
}
