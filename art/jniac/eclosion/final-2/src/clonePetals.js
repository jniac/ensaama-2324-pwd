
export function clonePetalA() {
  const petal = document.querySelector('.jnc-final-2 .petal-a')
  for (let i = 1; i < 6; i++) {
    const clone = petal.cloneNode(true)
    clone.style.setProperty('--angle', `${60 * i}deg`)
    petal.parentElement.append(clone)
  }
}

export function clonePetalB() {
  const petal = document.querySelector('.jnc-final-2 .petal-b')
  for (let i = 1; i < 12; i++) {
    const clone = petal.cloneNode(true)
    clone.style.setProperty('--angle', `${30 * i}deg`)
    petal.parentElement.append(clone)
  }
}

export function clonePetalC() {
  const petal = document.querySelector('.jnc-final-2 .petal-c')
  for (let i = 1; i < 3; i++) {
    const clone = petal.cloneNode(true)
    clone.style.setProperty('--angle', `${120 * i}deg`)
    petal.parentElement.append(clone)
  }
}
