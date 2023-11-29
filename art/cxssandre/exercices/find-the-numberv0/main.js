alert ('Hello')

const userWantsToPlay = confirm('Tu veux jouer à un super jeu?')

if (userWantsToPlay === false) {
    alert('Si, si, tu VEUX jouer')
}

alert('Lets gooooo')

alert(`Il s'agit de trouver un nombre "caché"`)

const userIsReady = confirm("Are you readyyyyy?")

if (userIsReady === false){
    alert('Prends ton temps mais pas trop.')
}

for (let i = 0; i< 3; i += 1){
    alert(`${3 - i}...`)
 }

const hiddenNumber = Math.ceil(Math.random() * 100)

alert("J'ai un nombre en tête. A toi de le trouver frerot. Fais un guess.")

function giveATry () {

    const userValue = prompt ('Alors?')
const userNumber = Number.parseFloat(userValue)

if (userNumber > hiddenNumber){
    alert('Trop grand')
    } else if (userNumber < hiddenNumber){
        alert('Trop pitit!')
    } else if (userNumber === hiddenNumber){
        alert('THATS IT BUDDY')
    } else {
        alert('UN NOMBRE BORDEL')
    }

    if (userNumber !== hiddenNumber){
        giveATry()
    }
}

giveATry ()
