import { clamp01, easings, inverseLerp } from '../../../common-resources/js/math-utils.js'
import { getArtIndex } from './art-indices.js'
import { eclosions } from './eclosion-data.js'
import { moduleSvgDebug } from './moduleSvgDebug.js'

class ScrollModule {
  /**
   * How damn hard is it to write a function that does "only" this?
   * @param {number} scroll 
   * @param {number} offset Represents the "position" of the modules (which are desynchronized, to be ready to get in when the current get out).
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
  artIndex = -1

  constructor(offset, step, scalar, iframe) {
    this.offset = offset
    this.step = step
    this.scalar = scalar
    this.iframe = iframe

    // Hiding the header from the iframe
    this.iframe.onload = () => {
      const style = this.iframe.contentDocument.createElement('style')
      style.innerHTML = ` header { display: none; }`
      this.iframe.contentDocument.head.appendChild(style)
    }
  }

  updateScroll(scroll) {
    const indexNew = ScrollModule.computeIndex(scroll, this.offset, this.step, this.scalar)
    this.setIndex(indexNew)

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

  setIndex(indexNew, artIndex = getArtIndex(indexNew)) {
    if (this.index === indexNew) {
      return
    }

    this.index = indexNew
    this.artIndex = artIndex

    const { person, folder } = eclosions[artIndex]
    const url = `../../art/${person.github}/eclosion/${folder}/`
    this.iframe.src = url
    this.person = person

    // const fullUrl = new URL(url, window.location.href)
    // console.log(fullUrl.href)
  }
}

function getArtIndexFromHash() {
  const hash = window.location.hash.slice(1)
  if (!hash) {
    return -1
  }

  const re = new RegExp(hash, 'i')
  return eclosions.findIndex(({ person }) => re.test(person.github))
}

/**
 * @param {ScrollModule} module 
 * @returns {ScrollModule}
 */
function initHashModule(module) {
  const artIndex = getArtIndexFromHash()
  if (artIndex !== -1) {
    module.setIndex(0, artIndex)
  }
  return module
}

function gotoArtIndex(artIndex) {
  const sortedModules = [...modules].sort((a, b) => a.index - b.index)
  const existingModule = sortedModules.find(module => module.artIndex === artIndex)
  const scrollDestination = existingModule.index * 2

  let scroll = scrollPosition
  function animate() {
    scroll += (scrollDestination - scroll) * 0.1
    scrollPosition = scroll
    if (Math.abs(scroll - scrollDestination) > 0.001) {
      window.requestAnimationFrame(animate)
    }
  }
  animate()
}

const iframes = document.querySelectorAll('iframe')
export const modules = [
  initHashModule(new ScrollModule(0, 3, 2, iframes[0])),
  new ScrollModule(1, 3, 2, iframes[1]),
  new ScrollModule(2, 3, 2, iframes[2]),
]

// moduleSvgDebug()

export let scrollPosition = 0
export let easeScrollPosition = 0
/** @type {ScrollModule} */
export let currentModule = null

function getCurrentModule() {
  return currentModule
}

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

let oldTouch = null
window.addEventListener('touchstart', event => {
  event.preventDefault()
  oldTouch = event.touches[0]
})
window.addEventListener('touchmove', event => {
  event.preventDefault()
  const deltaY = event.touches[0].clientY - oldTouch.clientY
  oldTouch = event.touches[0]
  scrollPosition += -deltaY / window.innerHeight
})

window.addEventListener('hashchange', () => {
  const artIndex = getArtIndexFromHash()
  if (artIndex !== -1) {
    gotoArtIndex(artIndex)
  }
})

document.querySelector('button.fullscreen').addEventListener('click', () => {
  document.documentElement.requestFullscreen()
})

Object.assign(window, {
  gotoArtIndex,
  getCurrentModule,
})
