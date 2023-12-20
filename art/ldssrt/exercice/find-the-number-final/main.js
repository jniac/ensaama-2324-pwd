
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

  const count = 3
  const delta = 5
  if (userNumber < hiddenNumber) {
    output('Trop petit.')
    for (let i = 0; i < count; i++) {
      addArrowUp(userNumber - i * delta)
    }
  } else if (userNumber > hiddenNumber) {
    output('trop grand')
    for (let i = 0; i < count; i++) {
      addArrowDown(100 - userNumber + i * delta)
    }

    // addArrowDown(100 - userNumber)
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
  // clearArt()
  if (userInputs.length === 0) {
    clearArt()
  }

  const userNumber = Number.parseFloat(input.value)
  input.value = ''
  if (Number.isNaN(userNumber)) {
    output('veuillez écrire un nombre')
  } else {
    reactToUserNumber(userNumber)
  }
}


