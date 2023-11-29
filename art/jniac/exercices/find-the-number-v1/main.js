
const main = document.querySelector('main')
const arrowSource = document.querySelector('.arrow')

main.onclick = (event) => {
  const clone = arrowSource.cloneNode(true)
  clone.style.top = `${event.y}px`
  main.append(clone)
}

