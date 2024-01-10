import { addArrowDown, addArrowUp, clearArt, makeArtIntro } from './art.js'


const gameOutput = document.querySelector('.game-output')

gameOutput.onclick = () => {
    gameOutput.classList.add('hidden')
    input.focus()
}
makeArtIntro()

const userInputs=[]

let number = 0
const randomN = () => {
    number = Math.ceil(Math.random() * 100)
}
randomN()


console.log(randomN)

const input = document.querySelector('input')

function reactToUserNumber(userNumber){
    userInputs.push(userNumber)
    document.querySelector('.memo').innerHTML=
        userInputs
            .map(x=>{
                let classname
                if(x<number){
                    classname='small'
                    addArrowUp(userNumber)
                }else if(x>number){
                    classname='big'
                    addArrowDown(   userNumber)
                }
                else{
                    classname='equal'
                }
                return `<div class="${classname}"=>${x}</div>`
            })
            .join('\n')

    if (userNumber > number) {
        gameOutput.classList.remove('hidden')
        gameOutput.innerHTML = 'trop grand'
    } else if (userNumber < number) {
        gameOutput.classList.remove('hidden')
        gameOutput.innerHTML = 'trop petit'
    } else {
        gameOutput.classList.remove('hidden')
        gameOutput.innerHTML = `BRAVO, le nombre était ${number}`
        makeArtIntro()
        randomN()
    }
}

input.oninput = () => {
    gameOutput.innerHTML = ''
    gameOutput.classList.remove('hidden')
}


input.onchange = () => {
    clearArt()
    const userNumber = Number.parseFloat(input.value)
    input.value = ''
    if (Number.isNaN(userNumber)) {
        gameOutput.classList.remove('hidden')
        gameOutput.innerHTML = 'un nombre stp'
    } else {
        reactToUserNumber(userNumber)
    }
}




