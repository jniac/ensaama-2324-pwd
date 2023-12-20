
import { makeArtIntro, clearArt, addArrowUp, addArrowDown } from './arrow.js'

const gameOutput = document.querySelector('.game-output')
gameOutput.onclick = () => {
  gameOutput.classList.add('hidden')
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

function reactToUserNumber(userNumber) {
  userInputs.push(userNumber)
  document.querySelector('.memo').innerHTML =
    userInputs
      .map(x => {
        // const classname = 'too big'

        let classname = ''
        if (x < hiddenNumber) {
          classname = 'too-small'
        }
        else if (x > hiddenNumber) {
          classname = 'too-big'
        }
        else {
          classname = 'equal'
        }
        return `<div class = "${classname}">${x}</div>`
      })
      .join('\n')

  if (userNumber < hiddenNumber) {
    output('Trop petit.')
    addArrowUp(userNumber)
  } else if (userNumber > hiddenNumber) {
    output('trop grand')
    addArrowDown(100 - userNumber)
  } else if (userNumber === hiddenNumber) {
    output('bravo')
  }
}

input.oninput = () => {
  gameOutput.innerHTML = ''
  hideOutput()
}


input.onchange = () => {
  // console.log(input.value)
  clearArt()

  const userNumber = Number.parseFloat(input.value)
  input.value = ''
  if (Number.isNaN(userNumber)) {
    output('veuillez écrire un nombre')
  } else {
    reactToUserNumber(userNumber)
  }
}


