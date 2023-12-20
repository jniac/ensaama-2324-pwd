
import { makeArtIntro, clearArt } from './arrow.js'

const gameOutput = document.querySelector('.game-output')
gameOutput.onclick = () => {
  gameOutput.classList.add('hidden')
  input.focus()
}

makeArtIntro()

const userInputs = []

const hiddenNumber = Math.ceil(Math.random() * 100)
console.log(`le nombre caché est ${hiddenNumber}`)

const input = document.querySelector('input')
input.onchange = () => {
  // console.log(input.value)
  clearArt()

  const userNumber = Number.parseFloat(input.value)
  input.value = ''
  if (Number.isNaN(userNumber)) {
    gameOutput.classList.remove('hidden')
    gameOutput.innerHTML = 'Veuillez écrire un nombre.'
  } else if (userNumber < hiddenNumber) {
    gameOutput.classList.remove('hidden')
    gameOutput.innerHTML = 'Non, trop petit.'
  } else if (userNumber > hiddenNumber) {
    gameOutput.classList.remove('hidden')
    gameOutput.innerHTML = 'Non, trop grand.'
  } else if (userNumber === hiddenNumber) {
    gameOutput.classList.remove('hidden')
    gameOutput.innerHTML = 'Bravo!'
  }
}


