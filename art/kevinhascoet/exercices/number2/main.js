import { clearArt, makeArt} from './art.js'

const output = document.querySelector('.output')
output.onclick = () => {
  output.classList.add('hidden')
  input.focus()
}

makeArt()

const userInputs = []

const hiddenNumber = Math.ceil(Math.random() *100)
console.log(`le nombre caché est ${hiddenNumber}`)

const input = document.querySelector('input')

input.oninput = () => {
  output.innerHTML = ''
  output.classList.add('hidden')
}

input.onchange = () => {
  clearArt()
  
  const userNumber = Number.parseFloat(input.value)
  input.value = ''
  if (Number.isNaN(userNumber)){
    output.classList.remove('hidden')
    output.innerHTML = 'Un nombre stp.'
  } else if (userNumber < hiddenNumber) {
    output.classList.remove('hidden')
    output.innerHTML = 'Trop grand.'
  } else if (userNumber > hiddenNumber) {
    output.classList.remove('hidden')
    output.innerHTML = 'Trop petit.'
  }
}