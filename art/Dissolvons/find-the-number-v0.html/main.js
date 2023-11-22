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

for(let i=0;i<3;i +=1){
    alert(`${3-i}...`)
}

const hiddenNumber = Math.ceil(Math.random()*100)

alert(`C'est bon, le jeu est prêt. à toi de trouver le nombre caché. Fais moi une proposition.`)


function giveATry(){

    const userString = prompt(`Alors ?`)
    const userNumber = Number.parseFloat(userString)
    
    if (userNumber > hiddenNumber) {
        alert('Trop grand! ')

    
    }   else if (userNumber < hiddenNumber){
        alert('Trop petit !')
    }   else if(userNumber === hiddenNumber) {
        alert('Tu as trouver! trop fort!')
    } else {
        alert('Un nombre!')
    }

if(userNumber !== hiddenNumber) {
    giveATry()
}

}

giveATry()







