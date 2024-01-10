import { lerp, map } from "./utils.js";

let hiddenNumber = Math.ceil(Math.random() * 10000);
console.log("Hidden Number = " + hiddenNumber);

let distanceFromHiddenNumber;

let won = false;

function home() {
    won = false
    let elementsToHide = document.getElementsByTagName("body")[0].children;
    for (let i = 0; i < elementsToHide.length; i++) {
        elementsToHide[i].classList.add("not-displayed");
    }
    document
        .getElementsByClassName("Home")[0]
        .classList.remove("not-displayed");
    document.getElementById(
        "questionText"
    ).innerHTML = `Quel est l'âge de ma grand mère ?`;
    document.getElementById("displayedText").style.opacity = 0;
}

function startBtn(isStart) {
    won = false
    if (isStart === true) {
        let elementsToHide = document.getElementsByTagName("body")[0].children;
        for (let i = 0; i < elementsToHide.length; i++) {
            elementsToHide[i].classList.add("not-displayed");
        }
        document
            .getElementsByClassName("Start")[0]
            .classList.remove("not-displayed");
        document.getElementById("restartButtonInGame").style.display = "none";
        document.getElementById("validerButtonInGame").style.display = "block";
        document.getElementById("reglesButtonInGame").style.display = "block";
        document.querySelector("input").style.opacity = "1";
        document.querySelector("input").style.pointerEvents = "auto";
    } else {
        document
            .getElementsByClassName("Home")[0]
            .classList.add("not-displayed");
        document
            .getElementsByClassName("No")[0]
            .classList.remove("not-displayed");
    }
}

function valider() {
    let userNumber = Number(document.querySelector("input").value);

    distanceFromHiddenNumber = Math.abs(hiddenNumber - userNumber);
    if (distanceFromHiddenNumber < 0) {
        distanceFromHiddenNumber *= -1;
    }
    if (distanceFromHiddenNumber >= 10000) {
        distanceFromHiddenNumber = 10000;
    }
    let distanceAngle = map(0, 10000, -90, 90, distanceFromHiddenNumber);

    document
        .querySelector(".arrows")
        .style.setProperty("--angle", `${distanceAngle}deg`);

    if (userNumber === hiddenNumber) {
        document.getElementById("displayedText").innerHTML = `elle avait effectivement ${hiddenNumber} ans ! \n Quelle vieille peau !`
        document.getElementById("questionText").innerHTML = `T'as gagné mon reuf !`
        document.getElementById("restartButtonInGame").style.display = "block"
        document.getElementById("validerButtonInGame").style.display = "none"
        document.getElementById("reglesButtonInGame").style.display = "none"
        document.querySelector("input").style.opacity = "0"
        document.querySelector("input").style.pointerEvents = "none"
        won = true
        win()
    } else if (userNumber > hiddenNumber) {
        document.getElementById("displayedText").innerHTML = `Elle est pas si vieille que ça ma gueule !`
    } else if (userNumber < hiddenNumber) {
        document.getElementById("displayedText").innerHTML = "Elle est plus vieille que ça mec !"
    }

    addInputToList(userNumber);

    document.getElementById("displayedText").style.opacity = 1;
    document.querySelector("input").value = "";
}

function addInputToList(input) {
    const list = document.querySelector(".past-user-inputs");

    for (let i = 1; i < list.children.length - 2; i++) {
        let elNumber = list.children.length - (i + 1);
        let el = list.children[elNumber];
        let el0 = list.children[elNumber - 1];
        el.innerHTML = el0.innerHTML;
    }

    let pInputHue = map(0, 10000, 250, 0, distanceFromHiddenNumber);
    let pInputLuminosity = map(0, 10000, 100, 43, distanceFromHiddenNumber);
    list.children[1].innerHTML = `<span style="color: hsl(${pInputHue} 100% ${pInputLuminosity}%)">${input}</span>`;
}

function win() {
    const list = document.querySelector(".past-user-inputs");

    for (let i = 1; i < list.children.length - 2; i++) {
        let elNumber = list.children.length - (i + 1);
        let el = list.children[elNumber];
        let el0 = list.children[elNumber - 1];
        el.innerHTML = el0.innerHTML;
    }

    let winInputHue = Math.ceil(Math.random() * 365);
    list.children[1].innerHTML = `<span style="color: hsl(${winInputHue} 100% 50%)">Gagné !</span>`;

    

    if(won == true) {
        setTimeout(() => {
            win()
        }, 100);
    }
}

Object.assign(window, {
    hiddenNumber,
    startBtn,
    valider,
    home,
    addInputToList,
    win,
});
