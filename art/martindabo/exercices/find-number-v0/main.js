alert('Salut!')

const userWantsToPlay = confirm('Tu veux jouer à un super jeu?')

if (userWantsToPlay == false )
    alert('Si, si, tu vas jouer')


alert('Bien, commençons')

alert("Ils s'agit de trouver un nombre caché")

const userIsReady = confirm('Est-tu prêt?')

if (userIsReady === false) {
    alert('Prend ton temps')
}

for (let i = 0; i < 3; i+= 1){
    alert(`${3 - i}...`)
}
alert("C'est parti mon kikiiiii !!!!")

const hiddenNumber = Math.ceil(Math.random() *100)

alert("Ca y est, j'ai caché un nombre. A toi de le trouver. Fait moi une proposition")

function giveATry (){
    const userString = prompt('Caca')
    const userNumber = Number.parseFloat (userString)

    if (userNumber > hiddenNumber){
    alert('Trop grand !')
    } else if (userNumber < hiddenNumber){
    alert('Trop petit !')
    } else if (userNumber == hiddenNumber){
    alert('Bien joué batman !')
    } else {
    alert('Holahola, faut me donner un nombre !!')
    }

    if (userNumber !== hiddenNumber)
    giveATry()
}

giveATry()