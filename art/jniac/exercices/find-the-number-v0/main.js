
alert('Salut toi.')

const userWantsToPlay = confirm('Tu veux jouer à un super jeu ?')

if (userWantsToPlay === false) {
  alert('Si, si, tu vas jouer')
} 

alert('bien commençons')

alert(`Il s'agit de trouver un nombre "caché"`)

const userIsReady = confirm(`Es-tu prêt ?`)

if (userIsReady === false) {
  alert('Prends ton temps.')
}

for (let i = 0; i < 3; i += 1) {
  alert(`${3 - i}...`)
}
alert(`C'est partiiiii !`)

const hiddenNumber = Math.ceil(Math.random() * 100)

alert(`Ça y est, j'ai caché un nombre. À toi de le trouver. Fais moi une proposition.`)


function giveATry() {
  const userString = prompt(`Kouakoubeh ?`)
  const userNumber = Number.parseFloat(userString)

  if (userNumber > hiddenNumber) {
    alert('Trop grand !')
  } else if (userNumber < hiddenNumber) {
    alert('Trop petit !')
  } else if (userNumber === hiddenNumber) {
    alert('Bien ouèj poto !')
  } else {
    alert('Hey, un nombre gros !')
  }

  if (userNumber !== hiddenNumber) {
    giveATry()
  }
}

giveATry()

