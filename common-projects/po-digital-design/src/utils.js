
export function wait(seconds) {
  return new Promise(resolve => window.setTimeout(resolve, seconds * 1000))
}
