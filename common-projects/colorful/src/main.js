import { arts } from './data.js'
import { initializeColorDiv } from './colorful.js'
import { round } from './utils.js'
import { onDrag } from './drag.js'

/**
 * @typedef {typeof arts[number]} Art
 * @typedef {{ art: Art, index: number, rect: DOMRect, inside: boolean }} Cell
 */

const style = document.createElement('style')
style.innerHTML = arts.map(art => `/* ${art.student.github} (${art.student.names.join(' ')}) */\n${art.style}`).join('\n\n')
document.head.appendChild(style)

let mainSize = 600
const col = 4
const row = Math.ceil(arts.length / col)

/** @type {HTMLDivElement} */
const artContainer = document.querySelector('.art-container')

const state = (() => {
  const view = new DOMRect()
  
  /** @type {Cell[]} */
  const cells = arts.map((art, index) => {
    const y = Math.floor(index / col)
    const x = index - y * col
    const rect = new DOMRect(x * mainSize, y * mainSize, mainSize, mainSize)
    const inside = false
    return { art, index, rect, inside }
  })
  
  /** @type {Set<Cell>} */
  const insideCells = new Set()

  /** @type {Set<Cell>} */
  const outsideCells = new Set()

  const toCellIndex = (x, y) => {
    const ix = pmod(x, col)
    const iy = pmod(y, row)
    return iy * col + ix
  }

  const getCell = (x, y) => {
    return cells[toCellIndex(x, y)]
  }

  return {
    view,
    cells,
    insideCells,
    outsideCells,
    toCellIndex,
    getCell,
  }
})()

const isolator = (() => {
  /** @type {HTMLDivElement} */
  const element = artContainer.querySelector('.isolator')
  const point = new DOMPoint(NaN, NaN)
  function update(x, y) {
    if (point.x === x && point.y === y)
      return

    point.x = x
    point.y = y

    element.style.left = `${(x - 1.5) * mainSize}px`
    element.style.top = `${(y - 1.5) * mainSize}px`
  
    const cell = state.getCell(x, y)
    element.querySelector('.info').innerHTML = cell 
      ? `<a href="../../art/${cell.art.student.github}/colorful/index.html">${cell.art.student.names.join(' ')}</a>`
      : ''
  }
  return {
    update,
  }
})()

for (const { art } of state.cells) {
  artContainer.append(art.mainElement)
  initializeColorDiv(art.mainElement)
}

function pmod(x, mod) {
  x %= mod
  return x < 0 ? x + mod : x
}

function updateSize() {
  mainSize = round(Math.min(window.innerWidth, window.innerHeight) * .9, 50)
  document.documentElement.style.setProperty('--art-size', `${mainSize}px`)
  document.documentElement.style.setProperty('--spacing', `${(Math.round(mainSize / 500 * 4) / 4).toFixed(2)}px`)

  for (const { art: { mainElement } } of state.cells) {
    mainElement.style.width = `${mainSize}px`
    mainElement.style.height = `${mainSize}px`
  }
}

function updatePosition() {
  const { view, cells, insideCells, outsideCells } = state
  artContainer.style.left = `${-view.x}px`
  artContainer.style.top = `${-view.y}px`

  view.width = window.innerWidth
  view.height = window.innerHeight

  const startX = Math.floor(view.left / mainSize)
  const startY = Math.floor(view.top / mainSize)
  const endX = Math.ceil(view.right / mainSize)
  const endY = Math.ceil(view.bottom / mainSize)

  const focusX = Math.floor((view.x + view.width / 2) / mainSize)
  const focusY = Math.floor((view.top + view.height / 2) / mainSize)

  isolator.update(focusX, focusY)

  Object.assign(window, {
    view: { startX, startY, endX, endY },
  })

  insideCells.clear()
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const cell = state.getCell(x, y)
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
    if (inside) {
      cell.art.mainElement.style.removeProperty('display')
    } else {
      outsideCells.add(cell)
      cell.art.mainElement.style.setProperty('display', 'none')
    }
  }

  // console.log(`${insideCells.size} / ${cells.length}`)
}

window.onresize = () => {
  updateSize()
  updatePosition()
}

updateSize()
updatePosition()

document.body.addEventListener('wheel', event => {
  event.preventDefault()
  state.view.x += event.deltaX * .5
  state.view.y += event.deltaY * .5
  updatePosition()
}, { passive: false })

onDrag(document.body, {
  simulatePhysics: true,
  onDrag: info => {
    state.view.x += -info.delta.x
    state.view.y += -info.delta.y
    updatePosition()
  },
  onDragStart: () => {
    document.documentElement.classList.add('dragged')
  },
  onDragStop: () => {
    document.documentElement.classList.remove('dragged')
  },
})
