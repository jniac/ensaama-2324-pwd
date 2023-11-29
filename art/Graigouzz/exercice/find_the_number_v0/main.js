/*alert('hello')

let userWantsToPlay=confirm("ui")

if(userWantsToPlay===false){
    alert("no")
}*/

alert("trouve le nombre")

let userIsReady=confirm("Are u ready?")

if(userIsReady==false){
    alert("très bien, je vous laisse un moment")
}

for(let i=5;i>0;i--){
alert(i)
}

alert(`Let's goo`)

let number=Math.ceil(Math.random()*100)

alert(`j'ai caché le nombre, bonne chance`)


let jeu=function(){

    let urNumber=parseFloat(prompt("ton nombre?"))
    if(urNumber>number){
        alert("trop grand")
    }else if(urNumber<number){
        alert("trop petit")
    }else{
        alert("BRAVO")
    }


    if (urNumber != number){
        jeu()
    }
}

jeu()