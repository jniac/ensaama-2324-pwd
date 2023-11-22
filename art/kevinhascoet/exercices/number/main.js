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

const number = 45

alert('aler trouve mon nombre')

const userstring = prompt('devine')
const usernumber = Number.parseFloat(userstring)

if (usernumber > number){
    alert('c moins !!')
} else if (usernumber < number){
    alert('c plus!!!')
} else if (usernumber == number){
    alert('bien jouer!!!!')
} else {
    alert('epepep aler done moi un nombre')
}