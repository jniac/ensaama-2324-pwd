import { clamp01, easings, inverseLerp } from '../../../common-resources/js/math-utils.js'
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

  index = NaN
  localScroll = 0
  innerScroll = 0

  /** @type {HTMLIFrameElement} */
  iframe = null

  /** @type {import('../../eclosion/src/data.js').Person} */
  person = null

  constructor(offset, step, scalar, iframe) {
    this.offset = offset
    this.step = step
    this.scalar = scalar
    this.iframe = iframe

    this.iframe.onload = () => {
      const style = this.iframe.contentDocument.createElement('style')
      style.innerHTML = `
        header { display: none; }
      `
      this.iframe.contentDocument.head.appendChild(style)
    }
  }

  updateScroll(scroll) {
    const indexNew = ScrollModule.computeIndex(scroll, this.offset, this.step, this.scalar)
    if (this.index !== indexNew) {
      this.index = indexNew
      const artIndex = getArtIndex(this.index)
      const { person, folder } = eclosions[artIndex]
      const url = `../../art/${person.github}/eclosion/${folder}/`
      this.iframe.src = url
      this.person = person
      const fullUrl = new URL(url, window.location.href)
    }

    const localScroll = scroll - this.index * this.scalar
    const innerScroll = clamp01(localScroll)
    this.iframe.contentDocument.scrollManager?.updateScroll(innerScroll)

    if (localScroll < 0) {
      const alpha = inverseLerp(0, .8, -localScroll)
      this.iframe.style.transform = `translateY(${(easings.cubicBezier(.75, .9, .8, 1)(alpha) * 100).toFixed(2)}%)`
      this.iframe.style.zIndex = '2'
    } else if (localScroll <= 1) {
      this.iframe.style.transform = ``
      this.iframe.style.zIndex = '1'
    } else {
      const alpha = 1 - localScroll
      this.iframe.style.transform = `translateY(${(easings.in3(alpha) * 20).toFixed(2)}%)`
      this.iframe.style.zIndex = '0'
    }

    this.localScroll = localScroll
    this.innerScroll = innerScroll
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
/** @type {ScrollModule} */
export let currentModule = null

function update(deltaTime) {
  scrollPosition += 0.1 * deltaTime
  easeScrollPosition += (scrollPosition - easeScrollPosition) * 0.1
  Object.assign(window, { scrollPosition, easeScrollPosition })

  for (const module of modules) {
    module.updateScroll(easeScrollPosition)
    if (module.localScroll >= 0 && module.localScroll <= 1) {
      currentModule = module
    }
  }

  if (currentModule) {
    const pc = Math.round(100 * currentModule.innerScroll).toString()
    const { github } = currentModule.person
    document.querySelector('header div span').innerHTML = `${github}{${pc}%}`
  }
}

let oldMs = 0
function frame(ms) {
  window.requestAnimationFrame(frame)

  const dt = (ms - oldMs) / 1000
  oldMs = ms
  update(dt)
}

window.requestAnimationFrame(frame)

window.addEventListener('wheel', event => {
  const delta = event.deltaY / window.innerHeight
  scrollPosition += delta * 0.5
})

document.querySelector('button.fullscreen').addEventListener('click', () => {
  document.documentElement.requestFullscreen()
})
