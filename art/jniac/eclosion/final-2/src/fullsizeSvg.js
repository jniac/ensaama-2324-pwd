import { initEclosion } from '../../../../../common-projects/eclosion/src/eclosion.js'
import { range, svgFactory } from '../../../../../common-projects/eclosion/src/tools.js'
import { easings, inverseLerp, lerp } from '../../../../../common-resources/js/math-utils.js'

const svg = document.querySelector('svg.fullsize')
  
function addRadialLines(count) {
  const lines = range(count, () => {
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
  initEclosion('jnc-final-2', update)
}

function addRadialTriangles({ 
  radialCount = 12, 
  rowCount = 5,
  turnOffset = .5,
  radiusMin = 30,
  radiusMax = 600,
} = {}) {
  const triPathData = svgFactory.path.polygon(3, 4)
  const triPathData2 = svgFactory.path.polygon(3, 8)

  const triangles = range(radialCount, () => {
    return range(rowCount, j => {
      const color = j === 0 ? 'var(--accent-color-1)' : 'white'
      const d = j === 0 ? triPathData2 : triPathData
      const triangle = svgFactory.createNode(`<path d="${d}" style="fill: ${color}"/>`)
      svg.append(triangle)
      return triangle
    })
  })

  const update = scroll => {
    for (let i = 0; i < radialCount; i++) {
      for (let j = 0; j < rowCount; j++) {
        const triangle = triangles[i][j]
        const turn = (i + turnOffset) / radialCount
        
        const radius = lerp(radiusMin, radiusMax, easings.out4(scroll)) + j * lerp(30, 50, easings.pcurve(1, 4)(scroll))
        
        const opacity = easings.out4(
          inverseLerp(0 + (rowCount - 1 - j) * .03, .5 + (rowCount - 1 - j) * .03, scroll) 
          * (.33 + inverseLerp(0, .5, scroll))
        )
        triangle.style.opacity = `${opacity.toFixed(2)}`

        const { x, y } = svgFactory.points.onCircle(radius, turn)
        triangle.style.transform = `
          translate(${x}px, ${y}px)
          rotate(${turn}turn)
        `
      }
    }  
  }

  update(0)
  initEclosion('jnc-final-2', update)
}


export function initFullsizeSvg() {
  addRadialLines(12 * 2)
  addRadialTriangles()
  addRadialTriangles({ rowCount: 3, turnOffset: 0, radiusMax: 500 })

  const resize = () => {
    const w = window.innerWidth, h = window.innerHeight
    svg.setAttributeNS(null, 'viewBox', `${-w / 2} ${-h / 2} ${w} ${h}`)
  }

  resize()
  window.addEventListener('resize', resize)
}
