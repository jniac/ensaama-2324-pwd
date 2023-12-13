alert('je suis l esprit de cet ordinateur')

const userWantsToPlay = confirm('aide moi a sortir de la stp')

if (userWantsToPlay === false){
    alert('tu es méchant tu ne m as pas aidé tu vas regretter')
}

alert('si tu perds tu vas mourrir')

alert('les règles sont simple trouve les paroles manquantes')

const userIsReady = confirm('si tu ne trouve pas un electrochoc te paralysera a vie')

if (userIsReady === false) {
    alert ('Tu ne peux pas t en tirer comme ça')
}

for (let i = 0; i < 3; i += 1) {
    alert(`${i}...`)
}

const hiddenNumber = Math.ceil(Math.random() * 100)

alert ('c est parti que le jeu commence')


function giveATry() {
    const userString = prompt ("au dd") 
    const userNumber = Number.parseFloat(userString)

    if (userString === 'exit') {
        return
    }
  
    if (userNumber > hiddenNumber) {
      alert('Trop grand !')
    } else if (userNumber < hiddenNumber) {
      alert('Trop petit !')
    } else if (userNumber === hiddenNumber) {
      alert('Tu as enfin gagné')
    } else {
      alert('Dommage trop tard tu as voulu jouer au plus malin')
    }
  
    if (userNumber !== hiddenNumber) {
      giveATry()
    }
  }
  
  giveATry()