
import * as easings from './easings.js'

export { 
  /**
   * Easing functions
   * 
   * https://www.desmos.com/calculator/chosfesws4
   */
  easings,
}

export const clamp01 = x => {
  return x < 0 ? 0 : x > 1 ? 1 : x
}

export const clamp = (x, min = 0, max = 1) => {
  return x < min ? min : x > max ? max : x
}

export const lerp = (a, b, t) => {
  return a + (b - a) * clamp01(t)
} 

export const inverseLerp = (a, b, t) => {
  return clamp01((t - a) / (b - a))
}

export const mapRange = (x, inMin, inMax, outMin, outMax, easing = easings.linear) => {
  if (typeof outMin !== 'number') {
    return mapRange(x, inMin, inMax, 0, 1, outMin)
  }
  return lerp(outMin, outMax, easing(inverseLerp(inMin, inMax, x)))
}
