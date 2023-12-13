import { clearArt,makeArtIntro } from './art.js'

const gameOutput = document.querySelector ('.game-output')
gameOutput.onclick = () => {
    gameOutput.classList.add('hidden')
    input.focus()
}

makeArtIntro()

const userInputs = []

const hiddenNumber = Math.ceil(Math.random() * 100)

// Un petit cheat
console.log(`le nombre caché est ${hiddenNumber}`)

const input = document.querySelector('input')
input.oninput = ()=> {
  gameOutput.innerHTML = ''
  gameOutput.classList.add ('hidden')
}
input.onchange = () => {
    clearArt()

    const userNumber = Number.parseFloat(input.value)
    input.value = ''
    if (Number.isNaN (userNumber)){
      gameOutput.classList.remove('hidden')
      gameOutput.innerHTML= 'un nombre'
    } else if (userNumber<hiddenNumber){
      gameOutput.classList.remove('hidden')
      gameOutput.innerHTML= 'Trop petit comme la taille de ta bite !'
    } else if (userNumber>hiddenNumber){
      gameOutput.classList.remove('hidden')
      gameOutput.innerHTML= 'Trop grand comme ta connerie !'
    } else { 
  alert('He He He, je vois que tu es un petit intello !')
}

}
