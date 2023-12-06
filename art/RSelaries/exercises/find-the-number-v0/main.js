import { lerp, map } from './utils.js'

let hiddenNumber = Math.ceil(Math.random() * 10000);
console.log('Hidden Number = ' + hiddenNumber);

let distanceFromHiddenNumber;

function home() {
    let elementsToHide = document.getElementsByTagName('body')[0].children
    for(let i = 0; i < elementsToHide.length; i++) { elementsToHide[i].classList.add('not-displayed') }
    document.getElementsByClassName('Home')[0].classList.remove('not-displayed')
    document.getElementById('questionText').innerHTML = `Quel est l'âge de ma grand mère ?`
    document.getElementById('displayedText').style.opacity = 0;
}

function startBtn(isStart) {
    if(isStart === true) {
        let elementsToHide = document.getElementsByTagName('body')[0].children
        for(let i = 0; i < elementsToHide.length; i++) { elementsToHide[i].classList.add('not-displayed') }
        document.getElementsByClassName('Start')[0].classList.remove('not-displayed')
        document.getElementById('restartButtonInGame').style.display = 'none';
        document.getElementById('validerButtonInGame').style.display = 'block';
    } else {
        document.getElementsByClassName('Home')[0].classList.add('not-displayed');
        document.getElementsByClassName('No')[0].classList.remove('not-displayed');
    }
}


function valider() {    
    console.log('=================');
    console.log('Hidden Number = ' + hiddenNumber);

    let userNumber = Number(document.querySelector('input').value)
    console.log('User Number = ' + userNumber)

    distanceFromHiddenNumber = Math.abs(hiddenNumber - userNumber)
    if (distanceFromHiddenNumber < 0) {
        distanceFromHiddenNumber *= -1
    }
    console.log('Distance = ' + distanceFromHiddenNumber)
    if(distanceFromHiddenNumber >= 10000) {
        distanceFromHiddenNumber = 10000;
    }
    console.log('Distance 2 = ' + distanceFromHiddenNumber)
    let distanceAngle = map(0, 10000, -90, 90, distanceFromHiddenNumber)
    console.log('Angle should be at : ' + distanceAngle)

    document.querySelector('.arrows').style.setProperty('--angle', `${distanceAngle}deg`)

    if(userNumber === hiddenNumber) {
        document.getElementById('displayedText').innerHTML = `elle avait effectivement ${hiddenNumber} ans ! \n Quelle vieille peau !`
        document.getElementById('questionText').innerHTML = `T'as gagné mon reuf !`
        document.getElementById('restartButtonInGame').style.display = 'block';
        document.getElementById('validerButtonInGame').style.display = 'none';
    } else if(userNumber > hiddenNumber) {
        document.getElementById('displayedText').innerHTML = `Elle est pas si vieille que ça ma gueule !`
    } else if(userNumber < hiddenNumber) {
        document.getElementById('displayedText').innerHTML = 'Elle est plus vieille que ça mec !'
    }

    document.getElementById('displayedText').style.opacity = 1;
    document.querySelector('input').value = ""
}

Object.assign(window, {
    startBtn,
    valider,
    home,
})