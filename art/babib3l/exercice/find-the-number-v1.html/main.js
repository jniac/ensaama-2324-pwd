import { clearArt, makeArtIntro } from './art.js'

const gameOutput = document.querySelector('.game-output')
gameOutput.onclick = () => {
  input.focus()
  hideOutput()
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

const hiddenNumber = Math.ceil(Math.random() * 100)
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
    output('dis moi un nombre')
  } else if (userNumber < hiddenNumber) {
    output('Trop petit.')
  } else if (userNumber > hiddenNumber) {
    output('Trop grand.')
  } else if (userNumber === hiddenNumber) {
    output('BRAVOO')
  }
}
