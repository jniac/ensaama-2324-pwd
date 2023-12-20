import { clearArt,makeArtIntro } from './art.js'

const gameOutput = document.querySelector ('.game-output')
gameOutput.onclick = () => {
    gameOutput.classList.add('hidden')
    input.focus()
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

// Un petit cheat
console.log(`le nombre caché est ${hiddenNumber}`)

const input = document.querySelector('input')

input.oninput = () => {
  gameOutput.innerHTML = ''
  hideOutput()
}

input.onchange = () => {
    clearArt()

    const userNumber = Number.parseFloat(input.value)
    input.value = ''
    if (Number.isNaN (userNumber)){
      output ('un nombre') 

    } else if (userNumber<hiddenNumber){
      output ('Trop petit comme la taille de ta bite !')

    } else if (userNumber>hiddenNumber){
      output ('Trop grand comme ta connerie !')

    } else if (userNumber === hiddenNumber) { 
      output ('He He He, je vois que tu es un petit intello !')
}

}