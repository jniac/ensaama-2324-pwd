import { randFFFFFF } from "../../../../common-resources/js/color-utils.js";
import { cleanArt as cleanArt, makeArtIntro } from "./arrow.js";

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

console.log('Le nombre caché est ${hiddenNumber}')

const input = document.querySelector('input')

function reactToUserNumber(userNumber) {
  userInputs.push(userNumber)
  document.querySelector('.memo').innerHTML =
    userInputs
      .map(x => {
        let classname = ''
        if (x < hiddenNumber) {
          classname = 'too-small'
        } else if (x > hiddenNumber) {
          classname = 'too-big'
        } else {
          classname = 'equal'
        }
        return `<div class="${classname}">${x}</div>`
      })
      .join('\n')

  if (userNumber < hiddenNumber) {
    output('trop pitit')
  } else if (userNumber > hiddenNumber) {
    output('trop grand')
  }
  else if (userNumber === hiddenNumber) {
    output('Trouvé')
  }
}

input.oninput = () => {
  gameOutput.innerHTML = ''
  hideOutput()
}

input.onchange = () => {
  cleanArt()

  const userNumber = Number.parseFloat(input.value)
  input.value = ''

  if (Number.isNaN(userNumber)) {
    output('Un nombre frero')
  } else {
    reactToUserNumber(userNumber)
  }
}