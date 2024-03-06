
const rangeMap = new Map()

const getDebugRangeWrapperElement = (() => {
  let element

  return function () {
    if (element == null) {
      const style = document.createElement('style')
      style.textContent = /* css */`
        .debug-range-wrapper {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;

          & > div {
            height: 10px;
            background-color: white;
          }
        }
      `
      document.head.appendChild(style)

      element = document.createElement('div')
      element.classList.add('debug-range-wrapper')
      document.body.appendChild(element)
    }

    return element
  }
})()

/**
 * 
 * @param {string} identifier 
 * @param {number} start 
 * @param {number} end 
 * @param {number} value 
 * @param {string} color
 */
export function debugUpdateRange(identifier, start, end, value, color = 'white') {
  function createBundle() {
    const wrapper = getDebugRangeWrapperElement()
    const div = document.createElement('div')
    div.classList.add('debug-range', `debug-range-${identifier}`)
    wrapper.appendChild(div)
    const bundle = { div }
    rangeMap.set(identifier, bundle)
    return bundle
  }
  const bundle = rangeMap.get(identifier) ?? createBundle()
  bundle.div.style.setProperty('margin-left', `${(start * 100).toFixed(2)}%`)
  bundle.div.style.setProperty('width', `${((end - start) * value * 100).toFixed(2)}%`)
  bundle.div.style.setProperty('background-color', color)
}
