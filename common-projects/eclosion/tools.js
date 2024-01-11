
export function range(count, map = i => i) {
  return Array.from({ length: count })
    .map((_, i) => map(i))
}

export async function replaceByExternalRef() {
  const parser = new DOMParser()

  const selector = 'img[data-eclosion-replace-by-external-ref=yes]'
  
  /** @type {string[]} */
  const urls = [...document.querySelectorAll(selector)]
    .map(element => element.getAttribute('src'))
  
  const promises = urls
    .map(async url => {
      const res = await window.fetch(url)
      const str = await res.text()
      return parser.parseFromString(str, 'application/xhtml+xml').documentElement
    })

  const svgs = await Promise.all(promises)

  for (const [index, url] of urls.entries()) {
    const selector = `img[data-eclosion-replace-by-external-ref=yes][src="${url}"]`
    const elements = document.querySelectorAll(selector)
    for (const element of elements) {
      element.replaceWith(svgs[index].cloneNode(true))
    }
  }
}

const dummySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
export const svgFactory = {
  /**
   * Creates an SVGElement from a string.
   * @param {string} svgString 
   * @returns {SVGElement}
   */
  createNode(svgString) {
    dummySvg.innerHTML = svgString
    return dummySvg.firstElementChild
  },

  points: {
    onCircle(radius = 10, offsetTurn = 0) {
      const a = 2 * Math.PI * offsetTurn;
      const x = radius * Math.cos(a)
      const y = radius * Math.sin(a)
      return new DOMPoint(x, y)
    },
    polygon(
      count = 6, 
      radius = 20, 
      { offsetTurn = 0, offsetX = 0, offsetY = 0 } = {},
    ) {
      const points = []
      for (let i = 0; i < count; i++) {
        const a = 2 * Math.PI * (i / count + offsetTurn);
        const x = offsetX + radius * Math.cos(a)
        const y = offsetY + radius * Math.sin(a)
        points.push(new DOMPoint(x, y))
      }
      return points
    },
  },

  path: {
    polygon(
      count = 6, 
      radius = 20, 
      { offsetTurn = 0, offsetX = 0, offsetY = 0 } = {},
      { precision = 2 } = {},
    ) {
      const points = svgFactory.points.polygon(count, radius, { offsetTurn, offsetX, offsetY })
      return [...points, points[0]]
        .map(({ x, y }, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(precision)} ${y.toFixed(precision)}`)
        .join('')
    }
  },
} 
