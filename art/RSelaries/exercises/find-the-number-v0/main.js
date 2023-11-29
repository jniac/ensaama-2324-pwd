let hiddenNumber = Math.ceil(Math.random() * 10000);
console.log(hiddenNumber);

function home() {
    let elementsToHide = document.getElementsByTagName('body')[0].children
    for(let i = 0; i < elementsToHide.length; i++) { elementsToHide[i].classList.add('not-displayed') }
    document.getElementsByClassName('Home')[0].classList.remove('not-displayed')
}

function startBtn(isStart) {
    if(isStart === true) {
        let elementsToHide = document.getElementsByTagName('body')[0].children
        for(let i = 0; i < elementsToHide.length; i++) { elementsToHide[i].classList.add('not-displayed') }
        document.getElementsByClassName('Start')[0].classList.remove('not-displayed')
    } else {
        document.getElementsByClassName('Home')[0].classList.add('not-displayed');
        document.getElementsByClassName('No')[0].classList.remove('not-displayed');
    }
}


function valider() {
    let userNumber = Number(document.querySelector('input').value)
    console.log(userNumber)
    if(userNumber === hiddenNumber) {
        console.log(`T'as gagné mon reuf, elle avait effectivement ${hiddenNumber} ans !\nQuelle vieille peau !`)
    } else if(userNumber > hiddenNumber) {
        console.log(`Elle est pas si vieille que ça ma gueule !`)
    } else if(userNumber < hiddenNumber) {
        console.log(`Elle est plus vieille que ça mec !`)
    }

    document.getElementById('displayedText').style.visibility = visible
    document.querySelector('input').value = ""
}