const bud = document.querySelector('.bud.jnc')

document.scrollingElement.onscroll = () => {
  const time = document.scrollingElement.scrollTop / document.scrollingElement.clientHeight
  bud.style.setProperty('--time', time.toFixed(3))
}

const petalA = bud.querySelector('.petal-a')
for (let i = 1; i < 6; i++) {
  const clone = petalA.cloneNode(true)
  clone.style.setProperty('--angle', `${60 * i}deg`)
  petalA.parentElement.append(clone)
}