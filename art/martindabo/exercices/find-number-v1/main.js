import { clearArt, makeArtIntro } from './arrow.js'

const gameOutput = document.querySelector('.game-output')
gameOutput.onclick = () => {
  gameOutput.classList.add('hidden')
  input.focus()
}

function output(message) {
  gameOutput.classList.remove('hidden')
  gameOutput.innerHTML = message
}


makeArtIntro()

const userInputs = []

const hiddenNumber = Math.ceil(Math.random() *100)
console.log(`le nombre caché est ${hiddenNumber}`)

const input = document.querySelector('input')

input.oninput = () => {
  gameOutput.innerHTML = ''
  gameOutput.classList.remove('hidden')
}

input.onchange = () => {
  clearArt()
  
  const userNumber = Number.parseFloat(input.value)
  input.value = ''
  if (Number.isNaN(userNumber)){
  output('Un nombre stp.')
  } else if (userNumber > hiddenNumber) {
  output('Trop grand.')
  } else if (userNumber < hiddenNumber) {
  output('Trop petit.')
  } else if (userNumber === hiddenNumber) {
  output('Bravooo!!!')
  }
}