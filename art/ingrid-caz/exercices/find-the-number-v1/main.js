
import { cleanArt, makeArtIntro } from './arrow.js'
import { getRandomFleur } from './fleurs.js'

const gameOutput = document.querySelector('.game-output')
gameOutput.onclick = () => {
    gameOutput.classList.add('hidden')
    input.focus()
}

makeArtIntro()

const userInputs = []

const fleur = getRandomFleur()

console.log(fleur)

const input = document.querySelector('input')
input.oninput = () => {
    gameOutput.innerHTML =''
    gameOutput.classList.add('hidden')
}

let goodLengthTryCount = 0

input.onchange = () => {
    cleanArt ()
    
    const userValue = input.value
    input.value =''

    if(userValue.length > fleur.length) {
        gameOutput.classList.remove('hidden')
        gameOutput.innerHTML ='trop long'

    } else if (userValue.length < fleur.length) {
        gameOutput.classList.remove('hidden')
        gameOutput.innerHTML ='trop court'

    } else if (userValue.length === fleur.length && userValue !== fleur){
        goodLengthTryCount += 1
        gameOutput.classList.remove('hidden')
        gameOutput.innerHTML ='bon nombre de caractère, mais pas la bonne fleur'

        if (goodLengthTryCount === 2) {
            gameOutput.classList.remove('hidden')
            gameOutput.innerHTML = (`Bon allez un indice tout de même, la première lettre est : ${fleur[0]}`) 
        }

    } else {
        gameOutput.classList.remove('hidden')
        gameOutput.innerHTML ='pas mal, tu connais bien les fleurs'
    }
}

