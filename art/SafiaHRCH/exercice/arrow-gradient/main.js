
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
input.oninput = () => {
    gameOutput.innerHTML = ''
    gameOutput.classList.add('hidden')
}

input.onchange = () => {
    clearArt()

    const userNumber = Number.parseFloat(input.value)
    input.value = ''
    if (Number.isNaN(userNumber)) {
        gameOutput.classList.remove('hidden')
        gameOutput.innerHTML = 'Donne moi un nombre.'
    } else if (userNumber > hiddenNumber) {
        gameOutput.classList.remove('hidden')
        gameOutput.innerHTML = 'Trop grand, comme ta stupidité'
    } else if (userNumber < hiddenNumber) {
        gameOutput.classList.remove('hidden')
        gameOutput.innerHTML = 'Trop petit, comme ton QI'
    } else if(userNumber === hiddenNumber){
        alert('Enfin, il était temps !')
    }
    
}