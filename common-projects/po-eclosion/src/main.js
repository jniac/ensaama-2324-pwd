import { clamp01 } from '../../../common-resources/js/math-utils.js'
import { data } from '../../eclosion/src/data.js'
import { getArtIndex, setArtCount } from './art-indices.js'
import { moduleSvgDebug } from './moduleSvgDebug.js'

const validWork = [
  'cxssandre',
  'ingrid-caz',
  'kevinhascoet',
  'ldssrt',
  'martindabo',
  'RSelaries',
  'SafiaHRCH',
]

const eclosions = data.students
  .filter(person => validWork.includes(person.github))
  .map(person => ({ person, folder: 'final' }))

eclosions.push({ person: data.teacher, folder: 'final' })

setArtCount(eclosions.length)

class ScrollModule {

  /**
   * How damn hard is it to write a function that does "only" this?
   * @param {number} scroll 
   * @param {number} offset Represents the "position" of the modules.
   * @param {number} step Represents the "distance" a module covers, if there are 3 modules step should be 3, if there are 4 modules step should be 4, etc.
   * @param {number} scalar It's an ambiguous concept, if scalar is 1 (default value) modules are "edge to edge", if scalar is 2 modules are spaced by 1, if scalar is 3 modules are spaced by 2, etc.
   * @returns {number}
   */
  static computeIndex(scroll, offset, step, scalar = 1) {
    return offset + Math.floor((scroll / scalar - offset) / step + 0.5) * step
  }

  offset = -1

  step = -1

  scalar = -1

  /** @type {HTMLIFrameElement} */
  iframe = null

  index = NaN

  constructor(offset, step, scalar, iframe) {
    this.offset = offset
    this.step = step
    this.scalar = scalar
    this.iframe = iframe
  }

  updateScroll(scroll) {
    const indexNew = ScrollModule.computeIndex(scroll, this.offset, this.step, this.scalar)
    if (this.index !== indexNew) {
      this.index = indexNew
      const artIndex = getArtIndex(this.index)
      const { person, folder } = eclosions[artIndex]
      const url = `../../art/${person.github}/eclosion/${folder}/`
      this.iframe.src = url
      const fullUrl = new URL(url, window.location.href)
    }

    const localScroll = scroll - this.index * this.scalar
    const innerScroll = clamp01(localScroll)
    this.iframe.contentDocument.scrollManager?.updateScroll(innerScroll)
    const outerScroll = localScroll < 0 ? localScroll : localScroll < 1 ? 0 : localScroll - 1
    this.iframe.style.transform = `translateY(${(-outerScroll * 100).toFixed(2)}%)`

    // const debugIndex = 0
    // this.iframe.style.visibility = this.offset === debugIndex ? 'visible' : 'hidden'
    // if (this.offset === debugIndex) {

    // }
  }
}

const iframes = document.querySelectorAll('iframe')
export const modules = [
  new ScrollModule(0, 3, 2, iframes[0]),
  new ScrollModule(1, 3, 2, iframes[1]),
  new ScrollModule(2, 3, 2, iframes[2]),
]

// moduleSvgDebug()

export let scrollPosition = 0
export let easeScrollPosition = 0

function update() {
  window.requestAnimationFrame(update)

  easeScrollPosition += (scrollPosition - easeScrollPosition) * 0.1
  Object.assign(window, { scrollPosition, easeScrollPosition })

  for (const module of modules) {
    module.updateScroll(easeScrollPosition)
  }
}

update()

window.addEventListener('wheel', event => {
  const delta = event.deltaY / window.innerHeight
  scrollPosition += delta
})

