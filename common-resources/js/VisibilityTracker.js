/**
 * Compute the intersection of
 * @param {DOMRect} a
 * @param {DOMRect} b
 * @param {DOMRect} out
 * @returns {DOMRect}
 */
function intersection(a, b, out = new DOMRect()) {
  const minx = Math.max(a.x, b.x)
  const maxx = Math.min(a.x + a.width, b.x + b.width)
  const miny = Math.max(a.y, b.y)
  const maxy = Math.min(a.y + a.height, b.y + b.height)
  out.width = maxx >= minx ? maxx - minx : 0
  out.x = maxx >= minx ? minx : (minx + maxx) / 2
  out.height = maxy >= miny ? maxy - miny : 0
  out.y = maxy >= miny ? miny : (miny + maxy) / 2
  return out
}

class VisibilityTracker {
  static #staticPrivate = {
    instances: [],
    windowRect: new DOMRect(),
  };
  static update() {
    const { instances, windowRect } = VisibilityTracker.#staticPrivate
    windowRect.width = window.innerWidth
    windowRect.height = window.innerHeight
    for (const instance of instances) {
      instance.update(windowRect)
    }
  }

  #private = {
    visibility: 0,
    visibilityOld: 0,
    listeners: [],
    rect: new DOMRect(),
  };
  constructor(element) {
    this.element = element
    VisibilityTracker.#staticPrivate.instances.push(this)
  }
  /**
   * @param {DOMRect} windowRect
   */
  update(windowRect) {
    const { rect, visibility: visibilityOld, listeners } = this.#private
    const fullRect = this.element.getBoundingClientRect()
    intersection(windowRect, fullRect, rect)
    const visibility = rect.width * rect.height / (fullRect.width * fullRect.height)
    Object.assign(this.#private, { visibility, visibilityOld })
    for (const { threshold, above, below } of listeners) {
      if (visibility >= threshold && visibilityOld < threshold) {
        above?.()
      }
      if (visibility < threshold && visibilityOld >= threshold) {
        below?.()
      }
    }
  }
  /**
   *
   * @param {*} params
   */
  onPass(params) {
    this.#private.listeners.push(params)
  }
}

const frame = () => {
  window.requestAnimationFrame(frame)
  VisibilityTracker.update()
}
window.requestAnimationFrame(frame)

export { VisibilityTracker }
