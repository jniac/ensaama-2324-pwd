
import { clearArt, makeArtIntro } from "./arrow.js"

const gameOutput = document.querySelector('.game-output')
gameOutput.onclick = () => {
    gameOutput.classList.add('hidden')
    input.focus()
}

makeArtIntro()

const userInputs = []

const hiddenNumber = Math.ceil(Math.random()*100)

console.log(`le nombre caché est ${hiddenNumber}`)

const input = document.querySelector('input')
input.onchange = () => {
    clearArt()

    const userNumber = Number.parseFloat(input.value)
    if (Number.isNaN(userNumber)) {
        gameOutput.classList.remove('hidden')
        gameOutput.innerHTML = 'Donne moi un nombre'
    }
    
}