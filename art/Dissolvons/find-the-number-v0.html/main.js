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

const hiddenNumber = Math.ceil(Math.random()*10000)


const timeMax = 10

alert(`C'est bon, le jeu est prêt. à toi de trouver le nombre caché. Fais moi une proposition.`)

function giveATry(){
    const remainingSeconds = timeMax - elapsedSeconds()

    if (remainingSeconds < 0) {
        alert(`Too late`)
        const again = confirm(`Un nouvel essai ?`)
        if (again) {
            startTime = Date.now()
            giveATry()
        }
        return
    }

    const userString = prompt(`Alors ? (temps restant : ${Math.round(remainingSeconds)}s)`)
    const userNumber = Number.parseFloat(userString)

    if (userString === 'exit') {
        return
    }
    
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

let startTime = Date.now()
function elapsedSeconds() {
    return (Date.now() - startTime) / 1000
}

giveATry()






