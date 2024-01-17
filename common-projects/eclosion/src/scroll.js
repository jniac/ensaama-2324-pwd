import { clamp01 } from '../../../common-resources/js/math-utils.js'

/**
 * @type {Map<string, { callbacks: ((time: number) => void)[] }>}
 */
const map = new Map()

/**
 * 
 * @param {string} identifier 
 * @param {(time: number) => void} onScrollChange 
 */
export function initBudScroll(identifier, onScrollChange) {
  const selector = `.bud.${identifier}`

  if (map.has(selector)) {
    map.get(selector).callbacks.push(onScrollChange)
    return
  }

  const bud = document.querySelector(selector)
  const callbacks = [onScrollChange]
  let timeOld = NaN

  const loop = () => {
    window.requestAnimationFrame(loop)
    
    let time = clamp01(document.body.scrollTop / document.body.clientHeight)
    if (document.scrollingElement) {
      time = Math.max(time, clamp01(document.scrollingElement.scrollTop / document.scrollingElement.clientHeight))
    }

    // Fix the viewport height on safari iOS.
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)

    if (time !== timeOld || window.performance.now() < 2000) {
      bud.style.setProperty('--time', time.toFixed(3))
      
      timeOld = time

      for (const callback of callbacks)
        callback(time)
    }
  }
  
  loop()

  map.set(selector, { callbacks })
}










