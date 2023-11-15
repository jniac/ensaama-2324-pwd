
const colors = [
  'color-a',
  'color-b',
  'color-c',
]

/**
 * 
 * @param {Partial<{
 *   duration: number
 *   onUpdate: (progress: number, deltaTime: number) => void
 *   onComplete: () => void
 * }>} params 
 */
function createAnimation(params) {
  const {
    duration = 1,
    onUpdate,
    onComplete,
  } = params
  let msOld = window.performance.now()
  let time = 0
  const frame = (ms) => {
    const dt = (-msOld + (msOld = ms)) / 1e3
    time += dt / duration
    time = time > 1 ? 1 : time
    onUpdate?.(time, dt)
    if (time < 1) {
      window.requestAnimationFrame(frame)
    } else {
      onComplete?.()
    }
  }
  window.requestAnimationFrame(frame) 
}

/**
 * Changes the color of a div (animated).
 * @param {HTMLElement} element 
 */
function changeColor(element) {
  // COLOR LOGIC:
  const currentColor = [...element.classList].find(c => c.startsWith('color-'))
  let index = colors.indexOf(currentColor)
  index += 1
  index %= colors.length
  const nextColor = colors[index]

  // DOM MANIPULATION:
  const solid = document.createElement('div')
  solid.classList.add('solid', nextColor)
  element.append(solid)
  
  // ANIMATION:
  const animationEnd = () => {
    solid.remove()
    element.classList.remove(currentColor)
    element.classList.add(nextColor)
  }
  const animationStart = () => {
    solid.style.opacity = '0'
    const duration = .3
    let msOld = window.performance.now()
    let time = 0
    const frame = (ms) => {
      const dt = (-msOld + (msOld = ms)) / 1e3
      time += dt / duration
      time = time > 1 ? 1 : time
      solid.style.opacity = time.toFixed(2)
      if (time < 1) {
        window.requestAnimationFrame(frame)
      } else {
        animationEnd()
      }
    }
    window.requestAnimationFrame(frame) 
  }
  animationStart()
}

/**
 * Add an "over" feedback (animated).
 * @param {HTMLElement} element 
 */
function addOverFeedback(element) {
  const div = document.createElement('div')
  div.classList.add('solid', 'over-feedback')
  element.append(div)
  createAnimation({
    duration: .5,
    onUpdate: progress => div.style.opacity = ((1 - progress) * .33).toFixed(2),
    onComplete: () => div.remove(),
  })
}

/**
 * Adds interactive behaviors on all "color" divs presents in the document.
 */
function initializeColorDiv(element = document.body) {
  /** @type {NodeListOf<HTMLElement>} */
  const divs = element.querySelectorAll('*[class*=color-]')
  for (const div of divs) {
    div.onpointerover = event => {
      if (event.pointerType === 'mouse') {
        event.stopPropagation()
        addOverFeedback(div)
      }
    }
    div.onclick = event => {
      event.stopPropagation()
      if (event.shiftKey) {
        div.classList.toggle('alt')
      } else {
        changeColor(div)
      }
    }
  }
}

function initializeMainSpacing() {
  const main = document.querySelector('main')
  const spacing = Math.round(main.offsetWidth / 500 * 4) / 4
  main.style.setProperty('--spacing', `${spacing.toFixed(2)}px`)
}

function initializeStandalonePage() {
  initializeMainSpacing()
  initializeColorDiv()
}

export {
  colors,
  initializeColorDiv,
  initializeStandalonePage,
}
