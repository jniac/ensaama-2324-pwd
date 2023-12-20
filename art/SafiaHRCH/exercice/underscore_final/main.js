
import { addArrowDown, addArrowUp, clearArt, makeArtIntro } from "./arrow.js"

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
        let classname = ''
        if (x < hiddenNumber) {
          classname = 'too-small'
        } else if (x > hiddenNumber) {
          classname = 'too-big'
        } else {
          classname = 'exact'
        }
        return `<div class="${classname}">${x}</div>`
      })
      .join(`\n`)

  const count = 10
  const delta = 8 + 10 * Math.random()
  if (userNumber < hiddenNumber) {
    output('Trop petit, comme ton QI')

    for (let i = 0; i < count; i++) {
      addArrowDown(100 - userNumber + i * delta)
    }
  } else if (userNumber > hiddenNumber) {
    output('Trop grand, comme ta stupidité')

    for (let i = 0; i < count; i++) {
      addArrowUp(userNumber - i * delta)
    }
  } else if (userNumber === hiddenNumber) {
    output('Enfin, il était temps')
  }
}

input.oninput = () => {
  gameOutput.innerHTML = ''
  hideOutput()
}

input.onchange = () => {
  if (userInputs.length === 0) {
    clearArt()
  }

  const userNumber = Number.parseFloat(input.value)
  input.value = ''
  if (Number.isNaN(userNumber)) {
    output('Donne moi un nombre')
  } else {
    reactToUserNumber(userNumber)
  }

}