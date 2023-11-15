
/**
 * @typedef {{
 *   position: DOMPoint
 *   positionOld: DOMPoint
 *   delta: DOMPoint
 *   totalDelta: DOMPoint
 *   deltaTime: number
 *   totalDistance: number
 * }} DragInfo 
 */

const defaultOptions = {
  distanceThreshold: 10,
  simulatePhysics: false,
  physicsConservationRatio: .1,
  physicsStopThreshold: .1,
  /** @type {'mouse' | 'touch' | 'all'} */
  pointerType: 'all',
  /** @type {(info: DragInfo) => void} */
  onDrag: () => { },
  /** @type {(info: DragInfo) => void} */
  onDragStart: () => { },
  /** @type {(info: DragInfo) => void} */
  onDragStop: () => { },
}

const computeDistance = ({ x, y }) => Math.sqrt(x * x + y * y)

/**
 * 
 * @param {HTMLElement} element
 * @param {Partial<typeof defaultOptions>} options
 */
export function onDrag(element, options) {
  const {
    pointerType,
    distanceThreshold,
    simulatePhysics,
    physicsConservationRatio,
    physicsStopThreshold,
    onDrag,
    onDragStart,
    onDragStop,
  } = { ...defaultOptions, ...options }

  let started = false
  let dragStarted = false
  let dragSuspended = false
  let physicsSimulationRunning = false

  const position = new DOMPoint()
  const positionOld = new DOMPoint()
  const delta = new DOMPoint()
  const totalDelta = new DOMPoint()
  let deltaTime = 0
  let totalDistance = 0

  const DELTA_MEMORIZATION_COUNT = 5
  const deltaMemorization = Array.from({ length: DELTA_MEMORIZATION_COUNT }).map(() => new DOMPoint())
  const computeDeltaAverage = () => {
    delta.x = 0
    delta.y = 0
    for (let i = 0; i < DELTA_MEMORIZATION_COUNT; i++) {
      delta.x += deltaMemorization[i].x
      delta.y += deltaMemorization[i].y
    }
    delta.x /= DELTA_MEMORIZATION_COUNT
    delta.y /= DELTA_MEMORIZATION_COUNT
  }

  /** @returns {DragInfo} */
  const info = () => {
    return {
      position: new DOMPoint(position.x, position.y),
      positionOld: new DOMPoint(positionOld.x, positionOld.y),
      delta: new DOMPoint(delta.x, delta.y),
      totalDelta: new DOMPoint(totalDelta.x, totalDelta.y),
      deltaTime,
      totalDistance,
    }
  }

  /** 
   * @param {number} x 
   * @param {number} y 
   */
  const start = (x, y) => {
    started = true
    physicsSimulationRunning = false
    totalDistance = 0
    position.x = x
    position.y = y
    positionOld.x = x
    positionOld.y = y
    totalDelta.x = 0
    totalDelta.y = 0
  }

  /** 
   * @param {number} x 
   * @param {number} y 
   */
  const move = (x, y) => {
    position.x = x
    position.y = y
  }

  const end = () => {
    started = false
    dragStarted = false
    dragSuspended = false
    if (simulatePhysics) {
      computeDeltaAverage()
      physicsSimulationRunning = true
    } else {
      onDragStop(info())
    }
  }

  /** @param {MouseEvent} event */
  const onMouseDown = event => {
    document.documentElement.addEventListener('mousemove', onMouseMove)
    document.documentElement.addEventListener('mouseup', onMouseUp)
    window.requestAnimationFrame(frame)
    const { clientX, clientY } = event
    start(clientX, clientY)
  }

  /** @param {MouseEvent} event */
  const onMouseMove = event => {
    const { clientX, clientY } = event
    move(clientX, clientY)
  }

  /** @param {MouseEvent} event */
  const onMouseUp = event => {
    document.documentElement.removeEventListener('mousemove', onMouseMove)
    document.documentElement.removeEventListener('mouseup', onMouseUp)
    end()
  }

  /** @param {TouchEvent} event */
  const onTouchStart = event => {
    document.documentElement.addEventListener('touchmove', onTouchMove)
    document.documentElement.addEventListener('touchend', onTouchEnd)
    window.requestAnimationFrame(frame)
    const { clientX, clientY } = event.touches[0]
    start(clientX, clientY)
  }

  /** @param {TouchEvent} event */
  const onTouchMove = event => {
    const { clientX, clientY } = event.touches[0]
    move(clientX, clientY)
    dragSuspended = event.touches.length > 1
  }

  /** @param {TouchEvent} event */
  const onTouchEnd = () => {
    document.documentElement.removeEventListener('touchmove', onTouchMove)
    document.documentElement.removeEventListener('touchend', onTouchEnd)
    end()
  }

  const frameRegularUpdate = () => {
    if (dragSuspended === false) {
      delta.x = position.x - positionOld.x
      delta.y = position.y - positionOld.y
      totalDelta.x += delta.x
      totalDelta.y += delta.y
      totalDistance = computeDistance(totalDelta)

      deltaMemorization.push(new DOMPoint(delta.x, delta.y))
      deltaMemorization.shift()

      if (dragStarted === false && totalDistance > distanceThreshold) {
        dragStarted = true
        onDragStart(info())
      }
      if (dragStarted) {
        onDrag(info())
      }
    }

    positionOld.x = position.x
    positionOld.y = position.y
  }

  /** @param {number} deltaTime */
  const framePhysicsUpdate = (deltaTime) => {
    const ratio = physicsConservationRatio ** deltaTime
    delta.x *= ratio
    delta.y *= ratio

    positionOld.x = position.x
    positionOld.y = position.y
    position.x += delta.x
    position.y += delta.y
    totalDelta.x += delta.x
    totalDelta.y += delta.y
    totalDistance = computeDistance(totalDelta)

    onDrag(info())

    physicsSimulationRunning = computeDistance(delta) > physicsStopThreshold

    if (physicsSimulationRunning === false) {
      onDragStop(info())
    }
  }

  let msOld = window.performance.now()
  const frame = (ms) => {
    deltaTime = (-msOld + (msOld = ms)) / 1e3

    if (physicsSimulationRunning) {
      framePhysicsUpdate(deltaTime)
      window.requestAnimationFrame(frame)
      return
    }

    if (started) {
      frameRegularUpdate()
      window.requestAnimationFrame(frame)
      return
    }
  }

  const isMouse = pointerType === 'all' || pointerType === 'mouse'
  const isTouch = pointerType === 'all' || pointerType === 'touch'
  if (isMouse) {
    element.addEventListener('mousedown', onMouseDown)
  }
  if (isTouch) {
    element.addEventListener('touchstart', onTouchStart)
  }

  const destroy = () => {
    started = false
    dragStarted = false
    if (isMouse) {
      element.removeEventListener('mousedown', onMouseDown)
      document.documentElement.removeEventListener('mousemove', onMouseMove)
      document.documentElement.removeEventListener('mouseup', onMouseUp)
    }
    if (isTouch) {
      element.removeEventListener('touchstart', onTouchStart)
      document.documentElement.removeEventListener('touchmove', onTouchMove)
      document.documentElement.removeEventListener('touchend', onTouchEnd)
    }
  }

  return { destroy }
}