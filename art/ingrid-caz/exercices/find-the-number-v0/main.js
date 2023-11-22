alert('Salut')

const userWantsToPlay = confirm('Tu veux jouer à un super jeu')

if (userWantsToPlay === false) {
    alert ('si, si tu vas jouer')
}

alert ('et bien commençons')

alert ('il faut trouver ma fleur préférée')

const userisready = confirm('Es-tu prêt ?')

if (userisready === false) {
    alert('Prends ton temps')
}

for(let i = 0; i < 3; i += 1) {
    alert(`${3-i}...`)
}

const fleurs = [
    'pivoine',
    'rose',
    'lys',
    'muguet',
    'chrysanthème',
    'iris',
    'marguerite',
    'tulipe',
    'hibiscus',
    'hortensia',
    'lilas',
    'jacinthe',
    'jonquille',
    'pissenlit',
    'camomille',
    'pâquerette',
    'coquelicot',
    'narcisse',
    'pensée',
    'géranium',
    'orchidée',
    'violette',
    'lavande',
    'mimosa',
    'oeillet',
    'primvère',
    'bleuet',
    'gardenia',
    'glycine',
    'jasmin',

]

const fleurIndex = Math.floor(Math.random() * fleurs.length)
const fleur = fleurs[fleurIndex]

console.log(fleur)

alert('cest parti, tu as 2 minutes')

let tryCount = 0
let goodLengthTryCount = 0


function giveATry(){
    tryCount += 1

    const userValue = prompt ('Alors')
    
    
    if (userValue.length > fleur.length) {
        alert('trop long, il faut moins de lettres')
    } else if (userValue.length < fleur.length) {
        alert('trop court')
    } else if (userValue.length === fleur.length && userValue !== fleur){
        goodLengthTryCount += 1
        alert ('bon nombre de lettre mais pas cette fleur-là')
        if (goodLengthTryCount === 2) {
            alert(`'Bon allez un indice tout de même, la première lettre est : ${fleur[0]}`)
        }
    } else {
        alert('{. .}, pas mal, tu connais bien les fleurs')
    }

    if (userValue !== fleur) {
        giveATry()
    }
}

giveATry()

