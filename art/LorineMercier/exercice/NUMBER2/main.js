import { clearArt, makeArtIntro } from './arrow.js'

const gameOutput = document.querySelector(`.game-output`)
gameOutput.onclick = () => {
  gameOutput.classList.add(`hidden`)
  input.focus()
}

makeArtIntro()

const userImput = []

const hiddenNumber = Math.ceil(Math.random() * 100)
console.log(`el nombre ké kaché este {hiddenNumber}`)

const input = document.querySelector(`input`)
input.onchange = () => {
  clearArt()

  const UserNumber = Number.parseFloat(input.value)
  input.value = ``
  if (Number.isNaN(UserNumber)) {
    gameOutput.classList.remove(`hidden`)
    gameOutput.innerHTML = `un nombre por favor`
  } else 
}
