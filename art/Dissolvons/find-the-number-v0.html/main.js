alert('Salutations à toi')

const userWantsToPlay = confirm('salut tu veux jouer ?')

if (userWantsToPlay === false) {
    alert('mhh pas le choix')
}

alert('Super!')

alert(`Tu vas devoir trouver un nombre "caché"`)

const userIsReady = confirm(`C'est parti !`)

if (userIsReady === false) {
    alert('Prends ton temps.')
}

const hiddenNumber = 36

alert(`C'est bon, le jeu est prêt. à toi de trouver le nombre caché. Fais moi une proposition.`)


function giveATry(){

    const userString = prompt(`Alors ?`)
    const userNumber = Number.parseFloat(userString)
    
    if (userNumber > hiddenNumber) {
        alert('Trop grand. Comme ta stupidité')

    
    }   else if (userNumber < hiddenNumber){
        alert('Trop petit, comme ton QI')
    }   else {
        alert('Enfin, il était temps !')
    }

if(userNumber !== hiddenNumber) {
    giveATry()
}

}

giveATry()







