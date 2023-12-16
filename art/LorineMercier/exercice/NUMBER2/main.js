import { clearArt, makeArtIntro } from './arrow.js'

const gameOutput = document.querySelector(`.game-output`)
gameOutput.onclick = () => {
  gameOutput.classList.add(`hidden`)
  input.focus()
}

function output(message){
  gameOutput.classList.remove(`hidden`)
  gameOutput.innerHTML=message
}

makeArtIntro()

const userImput = []

const hiddenNumber = Math.ceil(Math.random() * 100)
console.log(`el nombre ké kaché este {hiddenNumber}`)

const input = document.querySelector(`input`)
input.onchange = () => {
  clearArt()

  const userNumber = Number.parseFloat(input.value)
  input.value = ``
  if (Number.isNaN(userNumber)) {
   output(`un nombre por favor`)
  } else if (userNumber > hiddenNumber) {
  output ('Trop grandé.')
  } else if (userNumber < hiddenNumber) {
 output ('Trop petite.')
  }
}

