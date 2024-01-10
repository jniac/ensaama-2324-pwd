export const toFF = x => Math.floor(x).toString(16).padStart(2, '0')

export const rand255 = () => {
  return Math.floor(Math.random() * 0xff)
}

export const randFF = () => {
  return toFF(Math.floor(Math.random() * 0xff))
}

/**
 * r, g, b are float [0, 1]
 * @param {number} r 
 * @param {number} g 
 * @param {number} b 
 * @returns {number}
 */
export const compyteGrayScale = (r, g, b) => {
  return .299 * r + .587 * g + b * .114
}

export const randGrayscale = () => {
  const gray = randFF()
  `#${gray}${gray}${gray}`
}

export const randFFFFFF = () => {
  return `#${randFF()}${randFF()}${randFF()}`
}

export const lerpFFFFFF = (colorA, colorB, alpha) => {
  colorA = colorA.replace('#', '')
  colorB = colorB.replace('#', '')
  const aR = Number.parseInt(colorA.slice(0, 2), 16)
  const aG = Number.parseInt(colorA.slice(2, 4), 16)
  const aB = Number.parseInt(colorA.slice(4, 6), 16)
  const bR = Number.parseInt(colorB.slice(0, 2), 16)
  const bG = Number.parseInt(colorB.slice(2, 4), 16)
  const bB = Number.parseInt(colorB.slice(4, 6), 16)
  const r = aR * (1 - alpha) + bR * alpha
  const g = aG * (1 - alpha) + bG * alpha
  const b = aB * (1 - alpha) + bB * alpha
  return `#${toFF(r)}${toFF(g)}${toFF(b)}`
}
