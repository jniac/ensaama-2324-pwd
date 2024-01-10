
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
    
    const time =
      document.scrollingElement.scrollTop /
      document.scrollingElement.clientHeight

    if (time !== timeOld) {
      bud.style.setProperty('--time', time.toFixed(3))
      
      timeOld = time

      for (const callback of callbacks)
        callback(time)
    }
  }
  
  loop()

  map.set(selector, { callbacks })
}
