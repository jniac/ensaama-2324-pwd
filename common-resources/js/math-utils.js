
import * as easings from './easings.js'

export { 
  /**
   * Easing functions
   * 
   * https://www.desmos.com/calculator/chosfesws4
   */
  easings,
}

/**
 * Clamps a value between 0 and 1.
 * @param {number} x
 * @returns {number}
 */
export const clamp01 = x => {
  return x < 0 ? 0 : x > 1 ? 1 : x
}

/**
 * Clamps the given value between the given minimum and maximum values.
 * @param {number} x
 * @param {number} min 
 * @param {number} max
 * @returns {number}
 */
export const clamp = (x, min = 0, max = 1) => {
  return x < min ? min : x > max ? max : x
}

/**
 * Linearly interpolates between t between a and b.
 * @param {number} a 
 * @param {number} b 
 * @param {number} t 
 * @returns {number}
 */
export const lerp = (a, b, t) => {
  return a + (b - a) * clamp01(t)
} 

/**
 * Inverse function of the lerp function.
 * @param {number} a 
 * @param {number} b 
 * @param {number} t 
 * @returns {number}
 */
export const inverseLerp = (a, b, t) => {
  return clamp01((t - a) / (b - a))
}

/**
 * Remap a number from a range to another range. An optional easing function may
 * be provided.
 * @param {number} x
 * @param {number} inMin
 * @param {number} inMax
 * @param {number} outMin
 * @param {number} outMax
 * @param {(t: number) => number} easing
 * @returns {number}
 */
export const mapRange = (x, inMin, inMax, outMin, outMax, easing = easings.linear) => {
  if (typeof outMin !== 'number') {
    return mapRange(x, inMin, inMax, 0, 1, outMin)
  }
  return lerp(outMin, outMax, easing(inverseLerp(inMin, inMax, x)))
}
