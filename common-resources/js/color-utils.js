export const randFF = () => {
  return Math.floor(Math.random() * 0xff)
    .toString(16)
    .padStart(2, '0')
}

export const randGrayscale = () => {
  const gray = randFF()
  `#${gray}${gray}${gray}`
}

export const randFFFFFF = () => {
  return `#${randFF()}${randFF()}${randFF()}`
}
