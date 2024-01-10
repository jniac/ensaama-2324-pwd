
import { addArrowDown, addArrowUp, cleanArt, makeArtIntro } from './arrow.js'
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

let goodLengthTryCount = 0
function reactToUserValue(userValue) {
  userInputs.push(userValue)
  document.querySelector('.memo').innerHTML =
    userInputs
      .map(str => {
        let classname = ''
        if (str.length < fleur.length){
          classname ='trop-court'
        } else if (str.length > fleur.length){
          classname ='trop-long'
        } else {
          classname= 'bon-nbr-carac'
        }
        return `<div class="${classname}">${str}</div>`
      })
      .join('\n')

      if (userValue.length > fleur.length) {
        output('trop long')
        for (let i = 0; i <= 8; i++) {
          addArrowDown(i * 4);
        }
    
      } else if (userValue.length < fleur.length) {
        output('trop court')
        for (let i = 0; i <= 8; i++) {
          addArrowUp(i * 4);
      }
    
      } else if (userValue.length === fleur.length && userValue !== fleur) {
        goodLengthTryCount += 1
        output('bon nombre de caractère, mais pas la bonne fleur')
        for (let i = 0; i <= 8; i++) {
          addArrowUp(i * 4);
          addArrowDown(i * 4)
      }
    
        if (goodLengthTryCount === 2) {
          output(`bon allez un indice tout de même, la première lettre est : ${fleur[0]}`)
        }
    
      } else {
        output('bravo!')
        makeArtIntro()
      }
}

input.oninput = () => {
  gameOutput.innerHTML = ''
  hideOutput()
}

input.onchange = () => {
  cleanArt()

  const userValue = input.value
  input.value = ''
  reactToUserValue(userValue)
}

