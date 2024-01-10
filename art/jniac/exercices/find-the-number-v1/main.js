import { addArrowDown, addArrowUp, clearArt, makeArtIntro } from './art.js'

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
    
  const distance = Math.abs(hiddenNumber - userNumber)
  const delta = distance / 3 + 3
  
  if (userNumber < hiddenNumber) {
    output('Trop petit.')
    for (let i = 0; i < 3; i++) {
      addArrowUp(userNumber - delta * i)
    }
  } else if (userNumber > hiddenNumber) {
    output('Trop grand.')
    for (let i = 0; i < 3; i++) {
      addArrowDown(100 - userNumber - delta * i)
    }
  } else if (userNumber === hiddenNumber) {
    output('bien ouèj.')
    input.blur()
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
    output('Un nombre stp.')
  } else {
    reactToUserNumber(userNumber)
  }
}
