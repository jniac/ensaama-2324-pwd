import { clearArt, makeArtIntro } from './art.js'


const gameOutput = document.querySelector('.game-output')

gameOutput.onclick = () => {
    gameOutput.classList.add('hidden')
    input.focus()
}
makeArtIntro()

let number = 0
const randomN = () => {
    number = Math.ceil(Math.random() * 100)
}
randomN()


console.log(randomN)

const input = document.querySelector('input')
input.oninput = () => {
    gameOutput.innerHTML = ''
    gameOutput.classList.remove('hidden')
}


input.onchange = () => {
    clearArt()
    const userNumber = Number.parseFloat(input.value)
    input.value = ''
    if (Number.isNaN(userNumber)) {
        gameOutput.classList.remove('hidden')
        gameOutput.innerHTML = 'un nombre stp'
    } else if (userNumber > number) {
        gameOutput.classList.remove('hidden')
        gameOutput.innerHTML = 'trop grand'
    } else if (userNumber < number) {
        gameOutput.classList.remove('hidden')
        gameOutput.innerHTML = 'trop petit'
    } else {
        gameOutput.classList.remove('hidden')
        gameOutput.innerHTML = `BRAVO, le nombre était ${number}`
        makeArtIntro()
        randomN()
    }
}




