import { clamp, clamp01 } from '../../../common-resources/js/math-utils.js'

/**
 * @typedef {{
 *   index: number
 *   element: HTMLElement
 *   identifier: string
 *   update: (scroll: number) => void
 *   onScrollChange: Set<(scroll: number) => void>
 * }} Eclosion
 */


class EclosionInstanceManager {
  /** @type {Eclosion[]} */
  eclosions = []

  indexQueue = []

  getNextIndex() {
    return this.indexQueue.shift() ?? 0
  }

  getEclosion(identifier) {
    return this.eclosions.find(e => e.identifier === identifier)
  }

  registerEclosion(eclosion) {
    this.eclosions.push(eclosion)
  }

  disposeEclosion(identifier) {
    const eclosion = this.getEclosion(identifier)
    if (eclosion) {
      this.eclosions.splice(this.eclosions.indexOf(eclosion), 1)
    }
  }
}

export const instanceManager = new EclosionInstanceManager()

/**
 * Init the eclosion scroll.
 * @param {string} identifier 
 * @param {(scroll: number) => void} onScrollChange 
 */
export function initEclosion(identifier, onScrollChange) {
  // initEclosion can be called multiple times, so we need to check if the 
  // eclosion already exists. If it does, we just add the onScrollChange callback.
  const existingEclosion = instanceManager.getEclosion(identifier)
  if (existingEclosion) {
    existingEclosion.onScrollChange.add(onScrollChange)
    return
  }

  const index = instanceManager.getNextIndex()

  /** @type {HTMLElement} */
  const element = document.querySelector(`.eclosion.${identifier}`)
  const main = document.querySelector(`.eclosion.${identifier} main`)

  element.dataset.index = index

  const update = relativeScroll => {
    const innerScroll = clamp01(relativeScroll)
    main.scrollTop = innerScroll * window.innerHeight

    element.style.setProperty('--scroll', innerScroll.toFixed(3))

    for (const onScrollChange of eclosion.onScrollChange) {
      onScrollChange?.(innerScroll)
    }

    const outerScroll = clamp(relativeScroll, -1, 2)
    if (outerScroll < 0) {
      const y = -outerScroll * window.innerHeight
      element.style.setProperty('transform', `translateY(${y.toFixed(1)}px)`)
    } else if (outerScroll > 1) {
      const y = (outerScroll - 1) * window.innerHeight
      element.style.setProperty('transform', `translateY(-${y.toFixed(1)}px)`)
    } else {
      element.style.setProperty('transform', `translateY(0)`)
    }
  }

  const eclosion = {
    index,
    element,
    identifier,
    onScrollChange: new Set([onScrollChange]),
    update,
  }

  instanceManager.registerEclosion(eclosion)

  update(0)

  // Trying to prevent blinking on load.
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      element.style.removeProperty('visibility')
    })
  })
}










const updateSize = () => {
  const padding = 32
  const defaultSize = 800
  const dim = Math.min(window.innerWidth, window.innerHeight) - padding
  const scale = Math.min(1, dim / defaultSize)
  for (const element of document.querySelectorAll(`.eclosion .bud`)) {
    element.style.setProperty('scale', scale.toFixed(4))
  }
}

window.addEventListener('resize', updateSize)

class EclosionScrollManager {
  #scroll = 0
  #scrollMin = 0
  #scrollMax = 1
  #scrollOld = 0
  #onScrollCallbacks = new Set()

  #indexes = new Set()
  #onRequireCallbacks = new Set()
  #onDisposeCallbacks = new Set()

  get scroll() {
    return this.#scroll
  }

  get scrollOld() {
    return this.#scrollOld
  }

  #requireIndex(index) {
    this.#indexes.add(index)
    for (const callback of this.#onRequireCallbacks) {
      callback(index)
    }
  }

  #disposeIndex(index) {
    this.#indexes.delete(index)
    for (const callback of this.#onDisposeCallbacks) {
      callback(index)
    }
  }

  /**
   * 
   * @param  {...number[]} newIndexes 
   */
  #updateIndexes(...newIndexes) {
    for (const index of this.#indexes) {
      if (newIndexes.includes(index) == false) {
        this.#disposeIndex(index)
      }
    }
    for (const index of newIndexes) {
      if (this.#indexes.has(index) == false) {
        this.#requireIndex(index)
      }
    }
  }

  updateScroll(value) {
    this.#scrollOld = this.#scroll
    this.#scroll = clamp(value, this.#scrollMin, this.#scrollMax)

    const currentEclosionIndex = Math.floor(this.#scroll / 2)
    this.#updateIndexes(
      currentEclosionIndex - 1,
      currentEclosionIndex,
      currentEclosionIndex + 1)

    for (const callback of this.#onScrollCallbacks) {
      callback(this.#scroll)
    }

    for (const eclosion of instanceManager.eclosions) {
      const relativeScroll = scrollManager.scroll - eclosion.index * 2
      eclosion.update(relativeScroll)
    }

    return this
  }

  onScroll(callback) {
    this.#onScrollCallbacks.add(callback)
    return this
  }

  onRequireEclosion(callback) {
    this.#onRequireCallbacks.add(callback)
    return this
  }

  onDisposeEclosion(callback) {
    this.#onDisposeCallbacks.add(callback)
    return this
  }

  noMinMax() {
    this.#scrollMin = -Infinity
    this.#scrollMax = Infinity
    return this
  }
}

export const scrollManager = new EclosionScrollManager()

window.addEventListener('wheel', event => {
  updateSize()

  const delta = event.deltaY / window.innerHeight
  scrollManager.updateScroll(scrollManager.scroll + delta)
})

// Expose scrollManager to the document scope for iframe communication.
Object.assign(document, { scrollManager })

