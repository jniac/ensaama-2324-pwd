
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

const hiddenNumber = 54

alert(`C'est bon, le jeu est prêt. à toi de trouver le nombre caché. Fais moi une proposition.`)

const userString = prompt(`Quelle est ta réponse ?`)
const userNumber = Number.parseFloat(userString)

if (userNumber > hiddenNumber) {
    alert('Trop grand. Comme ta stupidité')
}   else if (userNumber < hiddenNumber){
    alert('Trop petit, comme ton QI')
}   else {
    alert('Enfin, il était temps !')
}
