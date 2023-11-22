alert('Salut toi.')

const userWantsToPlay = confirm ('Joue avec Moi.')

if (userWantsToPlay === false){
    alert ('Tu VAS jouer avec Moi.')
}
alert ('Génial')

alert (`Il s'agit de trouver un nombre "caché" `)

const userIsReady = confirm (`Es-tu prêt ?`)
if (userIsReady === false) {
    alert ('Prends ton temps.')
}

alert ('Génial')

for (let i = 0; i < 3; i += 1){
    alert(`${3-i}...`)
}

alert ('Génial')

const hiddenNumber = Math.ceil(Math.random()*10000
)

alert (`He he he ! Je l'ai enfin caché. A toi maintenant de le trouver. Fais moi une proposition. Si tu réussie je te suce la bite`)

alert ('Génial')


function giveATry (){
    const userString = prompt (`Dit moi`)
    const userNumber = Number.parseFloat(userString)
    
    if (userNumber > hiddenNumber){
        alert('Trop grand comme ta connerie !')
    }   else if (userNumber < hiddenNumber){
        alert('Trop petit comme la taille de ta bite !')
    }   else { 
        alert('He He He, je vois que tu es un petit intello !')
    }

    if (userNumber!== hiddenNumber){
        giveATry()
    }
}

giveATry ()
alert ('Génial')
alert ('Génial')
alert ('Génial')
alert ('Génial')