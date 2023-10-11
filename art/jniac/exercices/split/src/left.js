
const [imageA, imageB] = document.querySelectorAll('.left .image')

let image = imageA

export function setLeftImageSrc(src) {
  image.style.setProperty('z-index', '0')
  image = image === imageA ? imageB : imageA
  image.style.setProperty('z-index', '1')
  image.style.setProperty('background-image', `url(${src})`)
  image.classList.add('hidden')
  window.requestAnimationFrame(() => {
    image.classList.remove('hidden')
  })
}
