alert ("salut!")

const ok = confirm (' tu veux jouer a un super jeu ?')

if (ok == false)
    alert ("ta grand mere")

    alert ("ca commence")

    alert (" il faut trouver un nombre caché")

const ready = confirm (" es tu pret")

if (ready==false){
    alert("prend ton temps")

}

for (let i = 0; i < 3; i +=1) {
    alert(`${i}...`)
}

    alert (`zé partii`)


const hiddenNumber = Math.ceil(Math.random() * 100)

    alert(" ca y est jai caché un nombre a toi de le retrouver")

function giveATry(){
    const userString = prompt('woup')
    const userNumber = Number.parseFloat(userString)

    if (userNumber > hiddenNumber) {
        alert("trop grand")
    }
    else if ( userNumber < hiddenNumber){
       alert("trop petit sale merde")
    }
    else if ( userNumber==hiddenNumber){
        alert("bien ouej chakal")
    } else { 
        alert("olala donne un autre nombre")
    }

    if (userNumber !== hiddenNumber) {
        giveATry()
    } 
}
giveATry()