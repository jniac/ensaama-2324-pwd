import { easeScrollPosition, modules } from './main.js'

export function moduleSvgDebug() {
  const viewSize = 800
  const view = new DOMRect(-viewSize / 2, -viewSize / 2, viewSize, viewSize)
  const scalar = 100

  const factorySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  function render(str) {
    factorySvg.innerHTML = str
    return factorySvg.firstElementChild
  }

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', `${view.x} ${view.y} ${view.width} ${view.height}`)
  svg.style.position = 'fixed'
  svg.style.top = 0
  svg.style.left = 0
  svg.style.width = '400px'
  svg.style.height = '400px'
  svg.style.backgroundColor = '#666'
  // svg.style.pointerEvents = 'none'
  svg.innerHTML = `
    <g></g>
    <line x1="${view.x}" y1="${0}" x2="${view.x + view.width}" y2="${0}" stroke="black" stroke-width="1" />
    <line x1="${0}" y1="${view.y}" x2="${0}" y2="${view.y + view.height}" stroke="black" stroke-width="1" />
  `

  for (let i = Math.floor(view.left / scalar); i <= Math.ceil(view.right / scalar); i++) {
    const x = i * scalar
    const line = render(`<line x1="${x}" y1="-20" x2="${x}" y2="20" stroke="black" stroke-width="1" />`)
    svg.appendChild(line)
  }

  const g = svg.querySelector('g')

  function update() {
    window.requestAnimationFrame(update)

    function lineModule(module) {
      const x1 = module.index * module.scalar * scalar
      const x2 = (module.index * module.scalar + 1) * scalar
      const y = module.offset * 50
      return `<line x1="${x1}" x2="${x2}" y1="${y}" y2="${y}" stroke="red" stroke-width="20" />`
    }

    const s = easeScrollPosition * scalar
    g.innerHTML = `
      ${lineModule(modules[0])}
      ${lineModule(modules[1])}
      ${lineModule(modules[2])}
      <line x1="${s}" x2="${s}" y1="${view.top}" y2="${view.bottom}" stroke="black" stroke-width="1" />
    `
  }

  update()

  document.body.appendChild(svg)
}
