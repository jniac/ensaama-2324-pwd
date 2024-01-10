import { addArrowDown, addArrowUp, clearArt, makeArt } from './art.js'

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


function reactToUserNumber(userNumber) {
  userInputs.push(userNumber)
  document.querySelector('.memo').innerHTML = 
    userInputs.map(x => {
      const classname = x > hiddenNumber ? 'too-big' : (x < hiddenNumber ? 'too-small' : 'equal')
      return `<div class="${classname}">${x}</div>`
    })
    .join('\n')
    
  if (userNumber < hiddenNumber) {
    outputMessage('nn c plus!')
    addArrowDown(100 - userNumber)
  } else if (userNumber > hiddenNumber) {
    outputMessage('c moins!!')
    addArrowUp(userNumber)
  } else if (userNumber === hiddenNumber) {
    outputMessage('bravo!!!!!!!')
  }
}

input.oninput = () => {
  output.innerHTML = ''
  hideOutput()
}

input.onchange = () => {
  if(userInputs.length === 0){
  clearArt()
  }

  const userNumber = Number.parseFloat(input.value)
  input.value = ''
  if (Number.isNaN(userNumber)) {
    outputMessage('g dit un nombre fdp')
  } else {reactToUserNumber(userNumber)
  }
}
