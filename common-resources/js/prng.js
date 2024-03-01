const defaultSeed = 123456789n

let state = defaultSeed

function next() {
  state = (state * 48271n) % 0x7fffffffn
}

function value() {
  return (Number(state) - 1) / (0x7fffffff - 1)
}

/**
 * @typedef {{
 *   init: (value?: BigInt | number) => PRNG
 *   state: (value?: BigInt) => BigInt
 *   float: (() => number) & ((max: number) => number) & ((min: number, max: number) => number)
 *   int: ((max: number) => number) & ((min: number, max: number) => number)
 *   chance: (probability: number) => boolean
 *   among: <T>(array: ArrayLike<T>) => T
 *   amongWeighted: <T>(array: ArrayLike<T>, weights: ArrayLike<number>, options?: { weightsAreNormalized?: boolean }) => T
 * }} PRNG
 * 
 * Pseudo Random Number Generator using BigInt for implementing the Park-Miller algorithm.
 * 
 * State can be saved and restored:
 * ```javascript
 * const state = PRNG.state()
 * // ...
 * PRNG.state(state)
 * // or
 * PRNG.init(state) // Slower because of internal checks.
 * ```
 * 
 * @type {PRNG}
 */
export const PRNG = {
  /**
   * Returns the current state of the PRNG, can be used to restore the state later.
   * @param {BigInt} value 
   * @returns BigInt
   */
  state(value = state) {
    state = value
    return state
  },

  init(seed) {
    if (typeof seed === 'bigint') {
      state = seed
    } else if (typeof seed === 'number') {
      state = BigInt(seed)
    } else {
      state = defaultSeed
    }

    state %= 0x7fffffffn
    if (state === 0n) {
      state = defaultSeed
    } else if (state < 0n) {
      state += 0x7fffffffn
    }

    return PRNG
  },

  float() {
    const [min, max] =
      arguments.length === 0 ? [0, 1] :
        arguments.length === 1 ? [0, arguments[0]] :
          arguments
    next()
    return min + (max - min) * value()
  },

  int() {
    const [min, max] =
      arguments.length === 1 ? [0, arguments[0]] :
        arguments
    next()
    return min + Math.floor((max - min) * value())
  },

  chance(probability) {
    return PRNG.float() < probability
  },

  among(array) {
    return array[PRNG.int(array.length)]
  },

  amongWeighted(array, weights, { weightsAreNormalized = false } = {}) {
    if (weights.length !== array.length) {
      throw new Error('Weights and array must have the same length')
    }

    if (!weightsAreNormalized) {
      const sum = weights.reduce((acc, weight) => acc + weight, 0)
      if (sum === 0) {
        throw new Error('Sum of weights must be greater than 0')
      }
      weights = weights.map(weight => weight / sum)
    }

    const rand = PRNG.float()
    let sum = 0
    for (let i = 0, max = array.length; i < max; i++) {
      sum += weights[i]
      if (rand < sum) {
        return array[i]
      }
    }

    return array[array.length - 1]
  }
}
