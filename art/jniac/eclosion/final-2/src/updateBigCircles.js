import { easings, mapRange } from '../../../../../common-resources/js/math-utils.js'

/** @type {SVGElement[]} */
export function updateBigCircles(scroll) {
  const bigCircles = [...document.querySelectorAll('svg.fullsize circle')]
  const [c1, c2, c3] = bigCircles

  let t1, t2, ease

  t1 = .3
  t2 = .8
  ease = easings.out(2)
  c1.style.opacity = mapRange(scroll, t1, t2, ease) * .5
  c1.style.transform = `scale(${mapRange(scroll, t1, t2, .8, 1, ease)})`
  
  
  t1 = .5
  t2 = .9
  ease = easings.out(3)
  c2.style.opacity = mapRange(scroll, t1, t2, ease) * .5
  c2.style.transform = `scale(${mapRange(easings.out(3)(scroll), t1, t2, .8, 1, ease)})`
  
  t1 = .6
  t2 = 1
  ease = easings.out(3.4)
  c3.style.opacity = mapRange(scroll, t1, t2, ease) * .5
  c3.style.transform = `scale(${mapRange(easings.out(4)(scroll), t1, t2, .8, 1, ease)})`
}
