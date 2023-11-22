alert('slt')

const play = confirm('tu veux jouer?')

if (play === false){
    alert('si')
}

alert('tu dois deviner mon nombre')
alert('aler on comence')

const ready = confirm('t pret?')

if (ready === false){
    alert('.. t chiant')
} 

for (let i = 0; i < 3; i++){
    alert(`${3 - i}...`)
}

const number = Math.ceil(Math.random() * 100)

alert('aler trouve mon nombre! c entre 0 et 100')

function giveATry(){
    const userstring = prompt('devine')
    const usernumber = Number.parseFloat(userstring)

    if (usernumber > number){
        alert('raté!! c moins')
    } else if (usernumber < number){
        alert('raté!!! c plus')
    } else if (usernumber == number){
        alert('bien jouer!!!!')
    } else {
        alert('epepep aler done moi un nombre')
    }
    if (usernumber !== number){
        giveATry()
    }
}

giveATry()