
alert('Salutations à toi')

const userWantsToPlay = confirm('ça te dirait de jouer avec moi ?')

if (userWantsToPlay === false) {
    alert(' Je posais la question par politesse, tu VAS jouer')
}

alert('Parfait')

alert(`Tu vas devoir trouver un nombre "caché"`)

const userIsReady = confirm(`Prêt ?`)

if (userIsReady === false) {
    alert('Prends ton temps.')
}

for (let i = 0; i < 3; i += 1){
    alert(`${3-i}...`)
}

alert(`Let's gooooooooo !`)

const hiddenNumber = Math.ceil(Math.random() * 100)

alert(`C'est bon, le jeu est prêt. à toi de trouver le nombre caché. Fais moi une proposition.`)

function giveATry () {
    const userString = prompt(`Quelle est ta réponse ?`)
    const userNumber = Number.parseFloat(userString)

    if (userNumber > hiddenNumber) {
        alert('Trop grand, comme ta stupidité')
    }   else if (userNumber < hiddenNumber){
        alert('Trop petit, comme ton QI')
    }   else if(userNumber === hiddenNumber){
        alert('Enfin, il était temps !')
    }   else {
        alert(`C'est fini, t'as perdu`)
    }

    if (userNumber !== hiddenNumber){
        giveATry()
    }
}

giveATry()

