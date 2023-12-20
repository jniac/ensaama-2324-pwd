import { clearArt, makeArt } from './art.js'

const output = document.querySelector('.output')
output.onclick = () => {
  input.focus()
  hideOutput()
}
function hideOutput() {
  output.classList.add('hidden')  
}
function outputMessage(message) {
  output.classList.remove('hidden')
  output.innerHTML = message
}

makeArt()

const userInputs = []

const hiddenNumber = Math.ceil(Math.random() * 100)
// Un petit cheat quand même:
console.log(`le nombre caché est ${hiddenNumber}`)

const input = document.querySelector('input')

input.oninput = () => {
  output.innerHTML = ''
  hideOutput()
}

input.onchange = () => {
  clearArt()

  const userNumber = Number.parseFloat(input.value)
  input.value = ''
  if (Number.isNaN(userNumber)) {
    outputMessage('g dit un nombre fdp')
  } else if (userNumber < hiddenNumber) {
    outputMessage('nn c plus!')
  } else if (userNumber > hiddenNumber) {
    outputMessage('c moins!!')
  } else if (userNumber === hiddenNumber) {
    outputMessage('bravo!!!!!!!')
  }
}
