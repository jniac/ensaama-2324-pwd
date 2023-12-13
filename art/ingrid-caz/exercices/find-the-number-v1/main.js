
import { cleanArt, makeArtIntro } from './arrow.js'
import { getRandomFleur } from './fleurs.js'

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

const fleur = getRandomFleur()

console.log(fleur)

const input = document.querySelector('input')

input.oninput = () => {
    gameOutput.innerHTML = ''
    hideOutput()
  }

let goodLengthTryCount = 0

input.onchange = () => {
    cleanArt ()
    
    const userValue = input.value
    input.value =''

    if(userValue.length > fleur.length) {
        output('trop long')
      
    } else if (userValue.length < fleur.length) {
        output('trop court')

    } else if (userValue.length === fleur.length && userValue !== fleur){
        goodLengthTryCount += 1
        output('bon nombre de caractère, mais pas la bonne fleur')

        if (goodLengthTryCount === 2) {
            output(`Bon allez un indice tout de même, la première lettre est : ${fleur[0]}`) 
        }

    } else {
        output('pas mal, tu connais bien les fleurs')
    }
}

