
/**
 * 
 * @param {DOMRect} a
 * @param {DOMRect} b
 * @return {boolean}
 */
export function doRectsOverlap(a, b) {
  return (
    a.left < b.right &&
    a.right > b.left &&
    a.top < b.bottom &&
    a.bottom > b.top
  )
}
