import { easings, mapRange } from '../../../../../common-resources/js/math-utils.js'

export function updateCoreTriangles(time) {
  const coreTriangles = [...document.querySelectorAll('.core #inner > *')]
  for (const [index, triangle] of coreTriangles.entries()) {
    const s = 0.8
    const w = 0.1
    const d = 0.03 * index
    const alpha = mapRange(time, s + d, s + w + d, 0, 1, easings.out3)
    triangle.setAttributeNS(null, 'opacity', alpha.toFixed(2))
  }
}
