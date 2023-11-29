  const randFF = () => {
    return Math.floor(Math.random() * 0xff)
      .toString(16)
      .padStart(2, '0')
  }

  const randFFFFFF = () => {
    return `#${randFF()}48dd`
  }
  


const main = document.querySelector('main')
const arrowSource = document.querySelector('.arrow')

main.onclick = (event) => {
    const clone = arrowSource.cloneNode(true)
    clone.style.top = `${event.clientY}px`
    main.append(clone)

    //rdm gradient color
    const color = randFFFFFF()
    const gradient = `linear-gradient(${color}, ${color}00)`
    clone.querySelector('.right').style.backgroundImage = gradient
    clone.querySelector('.left').style.backgroundImage = gradient


    //dynamic angle
    const angle = (event.y) / 20
    clone.style.setProperty('--angle', `${angle}deg`)
}