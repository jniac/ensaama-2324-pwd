
export function clonePetalA() {
  const count = 8
  const petal = document.querySelector('.all .petal-a')
  for (let i = 1; i < count; i++) {
    const clone = petal.cloneNode(true)
    const angle = `${(360 / count) * i}deg`
    clone.style.setProperty('--angle', angle)
    petal.parentElement.append(clone)
  }
}

