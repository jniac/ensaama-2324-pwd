
alert(`Tu t'es fait hacké par Pierrenoi dsl`)

const ok = confirm(`Si tu veux que j'arrête tu dois payer`)

if (ok === false) {
    alert(`Si si tu vas payer`)
}

alert(`PAYE!`)

alert(`J'AI BESOIN DE CET ARGENT PTN`)

const paok = confirm(`Ok tu veux toujours pas payer ?`)

if (paok === false) {
    alert(`Y a pas de soucis je peux attendre`)
}

for (let i = 0; i < 3; i += 1) {
    alert(`${i}...`)
}

const hiddenNumber = 7630064525465248429987787

alert(`ça y est j'ai caché mon RIB. Fais moi un virement de 10 000$`)


function giveATry() {
    const userString = prompt('Montant de 10 000$ à transférer à')
    const userNumber = Number.parseFloat(userString)

    if (userNumber > hiddenNumber) {
        alert('Pas le bon destinataire')
    } else if (userNumber < hiddenNumber) {
        alert ('Pas le bon destinataire')
    } else if (userNumber === hiddenNumber) {
        alert(`HAHAHA je t'ai bien scam, chiale`)
    } else {
        alert(`Hey, poto m'ignore pas comme ça`)
    }

    // ! = = -> !==
    if (userNumber !== hiddenNumber) {
        giveATry()
    }
}

giveATry()