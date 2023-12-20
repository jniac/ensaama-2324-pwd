import { addArrowDown, addArrowUp, clearArt, makeArtIntro } from './arrow.js'

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

const hiddenNumber = Math.ceil(Math.random() * 100)
console.log(`le nombre caché est ${hiddenNumber}`)

const input = document.querySelector('input')

function reactToUserNumber(userNumber) {
  userInputs.push(userNumber)
  document.querySelector('.memo').innerHTML =
    userInputs.map(x => {
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

  if (userNumber > hiddenNumber) {
    output('Trop grand.')
    addArrowDown(100 - userNumber)
  } else if (userNumber < hiddenNumber) {
    output('Trop petit.')
    addArrowUp(userNumber)
  } else if (userNumber === hiddenNumber) {
    output('Trouvé!')
  }
}

input.oninput = () => {
  gameOutput.innerHTML = ''
  gameOutput.classList.remove('hidden')
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



// (userNumber > hiddenNumber) {
//   output('Trop grand.')
//   } else if (userNumber < hiddenNumber) {
//   output('Trop petit.')
//   } else if (userNumber === hiddenNumber) {
//   output('Trouvé!')
//   }