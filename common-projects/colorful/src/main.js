import { arts } from './data.js'
import { initializeColorDiv } from './colorful.js'
import { doRectsOverlap } from './utils.js'

/**
 * @typedef {typeof arts[number]} Art
 * @typedef {{ art: Art, index: number, rect: DOMRect, inside: boolean }} Cell
 */

const style = document.createElement('style')
style.innerHTML = arts.map(art => `/* ${art.student.github} (${art.student.names.join(' ')}) */\n${art.style}`).join('\n\n')
document.head.appendChild(style)

const mainSize = 600
const col = 4
const row = Math.ceil(arts.length / col)

document.documentElement.style.setProperty('--spacing', `${(mainSize / 500).toFixed(3)}px`)

const artContainer = document.createElement('div')
artContainer.classList.add('art-container')
document.body.append(artContainer)

const state = {
  view: new DOMRect(),
  /** @type {Cell[]} */
  cells: arts.map((art, index) => {
    const y = Math.floor(index / col)
    const x = index - y * col
    const rect = new DOMRect(x * mainSize, y * mainSize, mainSize, mainSize)
    const inside = false
    return { art, index, rect, inside }
  }),
  /** @type {Set<Cell>} */
  insideCells: new Set(),
  /** @type {Set<Cell>} */
  outsideCells: new Set(),
}

for (const { art, rect } of state.cells) {
  art.mainElement.style.left = `${rect.x}px`
  art.mainElement.style.top = `${rect.y}px`
  art.mainElement.style.width = `${rect.width}px`
  art.mainElement.style.height = `${rect.height}px`
  artContainer.append(art.mainElement)
  initializeColorDiv(art.mainElement)
}

function pmod(x, mod) {
  x %= mod
  return x < 0 ? x + mod : x
}

function update() {
  const { view, cells, insideCells, outsideCells } = state
  artContainer.style.left = `${-view.x}px`
  artContainer.style.top = `${-view.y}px`

  view.width = innerWidth
  view.height = innerHeight

  const startX = Math.floor(view.left / mainSize)
  const startY = Math.floor(view.top / mainSize)
  const endX = Math.ceil(view.right / mainSize)
  const endY = Math.ceil(view.bottom / mainSize)

  insideCells.clear()
  for (let y = startY; y < endY; y++) {    
    for (let x = startX; x < endX; x++) {
      const ix = pmod(x, col)
      const iy = pmod(y, row)
      const index = iy * col + ix
      const cell = cells[index]
      if (cell) {
        insideCells.add(cell)
        const { mainElement } = cell.art
        mainElement.style.left = `${x * mainSize}px`
        mainElement.style.top = `${y * mainSize}px`
      }
    }
  }

  outsideCells.clear()
  for (const cell of cells) {
    const inside = insideCells.has(cell)
    cell.inside = inside
    if (inside === false) {
      outsideCells.add(cell)
    }
  }

  // console.log(`${insideCells.size} / ${cells.length}`)
}

document.body.addEventListener('wheel', event => {
  event.preventDefault()
  state.view.x += event.deltaX
  state.view.y += event.deltaY
  update()
}, { passive: false })

