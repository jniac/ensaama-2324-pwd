const main = document.querySelector('main')
const arrowSource = document.querySelector('.arrow')

main.onclick = (even)=> {
  console.log(even.clientY)

  const clone = arrowSource.cloneNode(true)
  clone.style.top =`${event.clientY}px`
  main.append(clone)


const colo = radFFFFFF()
const lineartGradient = `linear-gradient(${color},${color}00)`
clone.querySelector(`right`).style.backgroundImage = linearGradient 
clone.querySelector(`left`).style.backgroundImage = linearGradient 

}