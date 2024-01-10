export function initBudScroll(identifier) {
  const bud = document.querySelector(`.bud.${identifier}`)

  document.scrollingElement.onscroll = () => {
  }
  
  const loop = () => {
    window.requestAnimationFrame(loop)
    const time =
      document.scrollingElement.scrollTop /
      document.scrollingElement.clientHeight
    bud.style.setProperty('--time', time.toFixed(3))
  }
  window.requestAnimationFrame(loop)
}
