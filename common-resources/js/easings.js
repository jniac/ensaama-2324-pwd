// https://en.wikipedia.org/wiki/Smoothstep
export const hermite01 = x => x * x * (3 - 2 * x)

// https://en.wikipedia.org/wiki/Smoothstep#Variations
export const hermiteSecond01 = x => x * x * x * (x * (x * 6 - 15) + 10)

export const linear = x => x

/**
 * Usage: 
 * ```
 * const ease = easings.in(1.33)
 * const alpha = ease(time)
 * // or, inlined,
 * const alpha = easeings.in(1.33)(time)
 * ```
 * @param {number} p 
 * @returns {number}
 */
export const pow = (p = 3) => x => x ** p

export const pow2 = x => x * x
export const pow3 = x => x * x * x
export const pow4 = x => x * x * x * x
export const pow5 = x => x * x * x * x * x
export const pow6 = x => x * x * x * x * x * x

export {
  pow as in,
  pow2 as in2,
  pow3 as in3,
  pow4 as in4,
  pow5 as in5,
  pow6 as in6,
}

/**
 * Usage: 
 * ```
 * const ease = easings.out(1.33)
 * const alpha = ease(time)
 * // or, inlined,
 * const alpha = easeings.out(1.33)(time)
 * ```
 * @param {number} p 
 * @returns {number}
 */
export const out = (p = 3) => x => 1 - (x = 1 - x) ** p

export const out2 = x => 1 - (x = 1 - x) * x
export const out3 = x => 1 - (x = 1 - x) * x * x
export const out4 = x => 1 - (x = 1 - x) * x * x * x
export const out5 = x => 1 - (x = 1 - x) * x * x * x * x
export const out6 = x => 1 - (x = 1 - x) * x * x * x * x * x

/**
 * Ease in/out with asymetrical inflexion point.
 * 
 * https://www.desmos.com/calculator/chosfesws4
 * 
 * Usage:
 * ```
 * const ease = easings.inout(3, .33)
 * const alpha = ease(time)
 * // or, inlined,
 * const alpha = easeings.inout(3, .33)(time)
 * ```
 * @param {number} p 
 * @param {number} i 
 * @returns 
 */
export const inout = (p = 3, i = 0.5) => {
  return x => (x < 0 ? 0 : x > 1 ? 1 : x < i
    ? 1 / Math.pow(i, p - 1) * Math.pow(x, p)
    : 1 - 1 / Math.pow(1 - i, p - 1) * Math.pow(1 - x, p)
  )
}

export const inout2 = x => {
  return (x < 0 ? 0 : x > 1 ? 1 : x < 0.5
    ? 2 * x * x
    : 1 - 2 * (x = 1 - x) * x
  )
}

export const inout3 = x => {
  return (x < 0 ? 0 : x > 1 ? 1 : x < 0.5
    ? 4 * x * x * x
    : 1 - 4 * (x = 1 - x) * x * x
  )
}

export const inout4 = x => {
  return (x < 0 ? 0 : x > 1 ? 1 : x < 0.5
    ? 8 * x * x * x * x
    : 1 - 8 * (x = 1 - x) * x * x * x
  )
}

export const inout5 = x => {
  return (x < 0 ? 0 : x > 1 ? 1 : x < 0.5
    ? 16 * x * x * x * x * x
    : 1 - 16 * (x = 1 - x) * x * x * x * x
  )
}

export const inout6 = x => {
  return (x < 0 ? 0 : x > 1 ? 1 : x < 0.5
    ? 32 * x * x * x * x * x * x
    : 1 - 32 * (x = 1 - x) * x * x * x * x * x
  )
}

/**
 * https://www.desmos.com/calculator/9h6o072i43 (from Inigo Quilez)
 * @param {number} a 
 * @param {number} b 
 * @returns 
 */
export const pcurve = (a = 1, b = 2) => {
  const k = ((a + b) ** (a + b)) / ((a ** a) * (b ** b))
  return x => {
    x = x < 0 ? 0 : x > 1 ? 1 : x
    return k * (x ** a) * ((1 - x) ** b)
  }
}