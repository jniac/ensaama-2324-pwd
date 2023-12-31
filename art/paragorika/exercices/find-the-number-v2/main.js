
import { clearArt, makeArtIntro } from './art.js'

const gameOutput = document.querySelector('.game-output')
gameOutput.onclick = () => {
  gameOutput.classList.add('hidden')
}

makeArtIntro()

const hiddenNumber = Math.ceil(Math.random() * 100)

// Un petit cheat quand même:
console.log(`le nombre caché est ${hiddenNumber}`)

const input = document.querySelector('input')
input.onchange = ()=>{
  clearArt()


const userNumber = Number.parseFloat(input.value)
input.value = ''
if (Number.isNaN(userNumber)) {
  gameOutput.classList.remove('hidden')
  gameOutput.innerHTML = 'Un nombre stp.'
} else if (userNumber < hiddenNumber) {
  gameOutput.classList.remove('hidden')
  gameOutput.innerHTML = 'Trop petit'
} else if (userNumber > hiddenNumber) {
  gameOutput.classList.remove('hidden')
  gameOutput.innerHTML = 'Trop grand' 
} else{
  gameOutput.classList.remove('hidden')
  gameOutput.innerHTML = 'bravoooo' 
  makeArtIntro()

}
}