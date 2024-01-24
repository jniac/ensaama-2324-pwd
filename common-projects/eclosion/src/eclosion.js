
const map = new Map()

/**
 * Init the eclosion scroll.
 * @param {string} identifier 
 * @param {(scroll: number) => void} onScrollChange 
 */
export function initEclosion(identifier, onScrollChange) {
  
  const root = document.querySelector(`.eclosion.${identifier}`)
  const main = document.querySelector(`.eclosion.${identifier} main`)

  let scroll = 0

  const updateScroll = () => {
    root.style.setProperty('--scroll', scroll.toFixed(3))
    updateSize()
    onScrollChange?.(scroll)
  }

  const updateSize = () => {
    const padding = 32
    const defaultSize = 800
    const dim = Math.min(window.innerWidth, window.innerHeight) - padding;
    const scale = Math.min(1, dim / defaultSize)
    document.querySelector(`.eclosion.${identifier} .bud`).style.setProperty('scale', scale.toFixed(4))
  }

  updateScroll(0)

  window.addEventListener('resize', updateSize)

  window.addEventListener('wheel', event => {
    main.scrollTop += event.deltaY
    const scrollNew = main.scrollTop / main.scrollHeight * 2
    
    if (scroll != scrollNew) {
      scroll = scrollNew
      updateScroll()
    }
  })
}