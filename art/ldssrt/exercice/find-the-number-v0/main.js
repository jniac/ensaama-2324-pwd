
alert('Bonjour')
const userWantsToPlay = confirm('Voulez-vous jouer à un jeu?')

if(userWantsToPlay === false) {

    alert('Si, tu vas jouer.')
}

alert('Bien, alors commençons.')
alert(`Le but du jeu est de trouver un nombre "caché".`)

const ready = confirm('Es-tu prêt?')

if (ready === false) {

    alert('Prend ton temps.')
}

for (let i = 0; i < 3; i +=1) {
    alert(`${3-i}...`)
}
alert('Allons-y.')

const hiddenNumber = Math.ceil(Math.random() * 100)

alert(`C'est bon j'ai caché un nombre à vous de le retrouver. Faites-moi une proposition.`)



function giveATry() {
    
    const userString =  prompt('Quel est votre proposition?')
    const userValue = Number.parseFloat(userString)
    
    if (userValue > hiddenNumber) {
        
        alert('Non, trop grand.')
    } else if (userValue < hiddenNumber) {
        alert('Non, trop petit.')
    } else {
        alert(`Bravo, c'est correct.`)
    }

    if (userValue !== hiddenNumber) {
        giveATry()
    }

}

giveATry()