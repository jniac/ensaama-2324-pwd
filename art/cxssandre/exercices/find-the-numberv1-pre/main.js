import { randFFFFFF } from "../../../../common-resources/js/color-utils.js";
import { cleanArt as cleanArt, makeArtIntro } from "./arrow.js";

const gameOutput = document.querySelector('.game-output')
gameOutput.onclick = () => {
  gameOutput.classList.add('hidden')
  input.focus()
}

function hideOutput (){
  gameOutput.classList.add('hidden')
}
function output(message){
  gameOutput.classList.remove('hidden')
  gameOutput.innerHTML = message
}

makeArtIntro()

const userInputs = []

const hiddenNumber = Math.ceil(Math.random() * 100)

console.log('Le nombre caché est ${hiddenNumber}')

const input = document.querySelector('input')

input.oninput = () =>{
  gameOutput.innerHTML = ''
  hideOutput()
}

input.onchange = () => {
  cleanArt()

  const userNumber = Number.parseFloat(input.value)
  if (Number.isNaN(userNumber)) {
    output('Un nombre frero')
} else if (userNumber < hiddenNumber) {
    output('trop pitit')
} else if (userNumber > hiddenNumber) {
    output('trop grand')
}
else if (userNumber === hiddenNumber) {
  output('Trouvé')
}

}