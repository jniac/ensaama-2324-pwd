
const map = new Map()

/**
 * Init the eclosion scroll.
 * @param {string} identifier 
 * @param {(scroll: number) => void} onScrollChange 
 */
export function initEclosion(identifier, onScrollChange) {
  
  const root = document.querySelector(`.${identifier}`)
  const main = document.querySelector(`.${identifier} main`)

  let scroll = 0

  const updateScroll = () => {
    root.style.setProperty('--scroll', scroll.toFixed(3))
    onScrollChange?.(scroll)
  }

  updateScroll(0)

  window.addEventListener('wheel', event => {
    main.scrollTop += event.deltaY
    const scrollNew = main.scrollTop / main.scrollHeight * 2
    
    if (scroll != scrollNew) {
      scroll = scrollNew
      updateScroll()
    }
  })
}