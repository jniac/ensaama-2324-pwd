
import { clearArt, makeArtIntro } from "./arrow.js"

const gameOutput = document.querySelector('.game-output')
gameOutput.onclick = () => {
    gameOutput.classList.add('hidden')
    input.focus()
    hideOutput ()
}

function hideOutput() {
    gameOutput.classList.add('hidden')  
  }
  function output(message) {
    gameOutput.classList.remove('hidden')
    gameOutput.innerHTML = message
}

makeArtIntro()

const userInputs = []

const hiddenNumber = Math.ceil(Math.random()*100)

console.log(`le nombre caché est ${hiddenNumber}`)

const input = document.querySelector('input')

input.oninput = () => {
  gameOutput.innerHTML = ''
  hideOutput()
}

input.onchange = () => {
  clearArt()

  const userNumber = Number.parseFloat(input.value)
  input.value = ''
  if (Number.isNaN(userNumber)) {
    output('Donne moi un nombre')
  } else if (userNumber < hiddenNumber) {
    output('Trop petit, comme ton QI')
  } else if (userNumber > hiddenNumber) {
    output('Trop grand, comme ta stupidité')
  } else if (userNumber === hiddenNumber) {
    output('Enfin, il était temps')
  }
}