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
// Un petit cheat quand même:
console.log(`le nombre caché est ${hiddenNumber}`)

const input = document.querySelector('input')

input.oninput = () => {
  gameOutput.innerHTML = ''
  hideOutput()
}

function reactToUserNumber(userNumber) {
  userInputs.push(userNumber)
  
  document.querySelector('.user-input-memo').innerHTML = userInputs
    .map(x => `<div>${x}</div>`)
    .join('\n')

  if (userNumber < hiddenNumber) {
    output('Trop petit.')
  } else if (userNumber > hiddenNumber) {
    output('Trop grand.')
  } else if (userNumber === hiddenNumber) {
    output('bien ouèj.')
  }
}

input.onchange = () => {
  clearArt()

  const userNumber = Number.parseFloat(input.value)
  input.value = ''
  if (Number.isNaN(userNumber)) {
    output('Un nombre stp.')
  } else {
    reactToUserNumber(userNumber)
  }
}
