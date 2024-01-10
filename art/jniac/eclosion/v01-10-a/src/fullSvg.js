import { initBudScroll } from '../../../../../common-projects/eclosion/scroll.js'
import { easings, lerp } from '../../../../../common-resources/js/math-utils.js'

const svg = document.querySelector('svg.full')
  
function addRadialLines(count) {

  const lines = Array.from({ length: count }).map((_, i) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line.setAttributeNS(null, 'stroke', '#fff6')
    svg.append(line)
    return line
  })
  
  const update = (scroll) => {
    for (const [i, line] of lines.entries()) {
      const a = 2 * Math.PI * i / count
      const cos = Math.cos(a)
      const sin = Math.sin(a)
      const r1 = lerp(800, 400, easings.out2(scroll))
      const r2 = i % 2 === 0 ? 1000 : r1 + 30 + 200 * (1 - scroll)
      line.setAttributeNS(null, 'x1', cos * r1)
      line.setAttributeNS(null, 'y1', sin * r1)
      line.setAttributeNS(null, 'x2', cos * r2)
      line.setAttributeNS(null, 'y2', sin * r2)
      line.setAttributeNS(null, 'opacity', scroll)
    }
  }

  update(0)
  initBudScroll('jnc', update)
}

export function initFullSvg() {

  addRadialLines(12 * 2)

  const resizeSvgFull = () => {
    const w = window.innerWidth, h = window.innerHeight
    svg.setAttributeNS(null, 'viewBox', `${-w / 2} ${-h / 2} ${w} ${h}`)
  }

  resizeSvgFull()

  window.addEventListener('resize', resizeSvgFull)
}