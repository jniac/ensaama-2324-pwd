export function clonePetalA() {
    const petal = document.querySelector(".rse .petal-1");
    for (let i = 1; i < 3; i++) {
        const clone = petal.cloneNode(true)
        clone.classList.remove('petal-1')
        clone.classList.add(`petal-${i+1}`)
        clone.style.setProperty("--angle", ` ${120 * i}deg `);
        petal.parentElement.append(clone);
    }
}

export function clonePetalB() {
    const flower = document.querySelector('.flower')
    for (let i = 0; i < 6; i++) {
            const clone = flower.cloneNode(true)
            clone.classList.remove(`flower`)
            clone.classList.add(`flower-${i}`, `flowers`)
            clone.style.setProperty("--angle", ` ${60 * i}deg `);
            document.querySelector(".bud").append(clone)
        }
}

export function clonePetalC() {
    const petalBig = document.querySelector('.big-petal-0')
    for (let i = 0; i < 7; i++) {
        const clone = petalBig.cloneNode(true)
        clone.classList.remove('big-petal-0')
        clone.classList.add(`big-petal-${i+1}`)
        clone.style.setProperty("--rotate-big", `${7.5 * (i+1)}deg`)
        document.querySelector(".bud").append(clone)
    }
}