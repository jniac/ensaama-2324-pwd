import { addArrowDown, addArrowUp, clearArt,makeArtIntro } from './art.js'

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

function reactToUserNumber(userNumber){
  userInputs.push(userNumber)
  document.querySelector('.memo').innerHTML=
  userInputs
    .map (x=> {
      let classname = ''
      if (x<hiddenNumber) {
        classname ='too-small'
        addArrowUp (userNumber)
      } else if (x>hiddenNumber){
          classname ='too-big'
          addArrowDown (userNumber)
      } else {
      classname ='equal'
      }
      return `<div class="${classname}">${x}</div>`
      })
    .join ('\n')

if (userNumber<hiddenNumber){
  output ('Inexistant comme ta liberté !')

} else if (userNumber>hiddenNumber){0
  output ('Trop grand comme la taille de tes chaines !')

} else if (userNumber === hiddenNumber) { 
  output ('He He He, bon ESCLAVE (blm)!')
}
}

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
    }else{
      reactToUserNumber(userNumber)
    }
    

}
