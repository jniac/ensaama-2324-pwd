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
    for (let i = 0; i < 2; i++) {
        const clone = petalBig.cloneNode(true)
        clone.classList.remove('big-petal-0')
        clone.classList.add(`big-petal-${i+1}`)
        clone.style.setProperty("--rotate-big", `${20 * (i+1)}deg`)
        document.querySelector(".bud").append(clone)
    }
}

export function cloneTriangle() {
    const triangle0 = document.querySelector('.triangle-0')
    for (let i = 0; i < 5; i++) {
        const clone = triangle0.cloneNode(true)
        clone.classList.remove('triangle-0')
        clone.classList.add(`triangle-${i+1}`)
        clone.style.setProperty("--angle", `${(i * 60) + 60}deg`)
        document.querySelector(".bud").append(clone)
    }
}

export function cloneTriangle1() {
    const triangle0 = document.querySelector('.triangle-0')
    for (let i = 0; i < 6; i++) {
        const clone = triangle0.cloneNode(true)
        clone.classList.remove('triangle-0')
        clone.classList.remove('triangles')
        clone.classList.add('triangles1')
        clone.classList.add(`triangle-${i+1}`)
        clone.style.setProperty("--angle", `${(i * 60) + 20}deg`)
        document.querySelector(".bud").append(clone)
    }
    for (let i = 0; i < 6; i++) {
        const clone = triangle0.cloneNode(true)
        clone.classList.remove('triangle-0')
        clone.classList.remove('triangles')
        clone.classList.add(`triangles1`)
        clone.classList.add(`triangle-${i+6}`)
        clone.style.setProperty("--angle", `${(i * 60) + 40}deg`)
        document.querySelector(".bud").append(clone)
    }
}

export function cloneTriangle2() {
    const triangle0 = document.querySelector('.triangle-0')
    for (let i = 0; i < 6; i++) {
        const clone = triangle0.cloneNode(true)
        clone.classList.remove('triangle-0')
        clone.classList.remove('triangles')
        clone.classList.add('triangles2')
        clone.classList.add(`triangle2-${i}`)
        clone.style.setProperty("--angle", `${(i * 60) + 60}deg`)
        document.querySelector(".bud").append(clone)
    }
    for (let i = 0; i < 6; i++) {
        const clone = triangle0.cloneNode(true)
        clone.classList.remove('triangle-0')
        clone.classList.remove('triangles')
        clone.classList.add(`triangles3`)
        clone.classList.add(`triangle-${i+6}`)
        clone.style.setProperty("--angle", `${(i * 60) + 60}deg`)
        document.querySelector(".bud").append(clone)
    }
    for (let i = 0; i < 6; i++) {
        const clone = triangle0.cloneNode(true)
        clone.classList.remove('triangle-0')
        clone.classList.remove('triangles')
        clone.classList.add(`triangles4`)
        clone.classList.add(`triangle-${i+6}`)
        clone.style.setProperty("--angle", `${(i * 60) + 60}deg`)
        document.querySelector(".bud").append(clone)
    }
    for (let i = 0; i < 6; i++) {
        const clone = triangle0.cloneNode(true)
        clone.classList.remove('triangle-0')
        clone.classList.remove('triangles')
        clone.classList.add(`triangles5`)
        clone.classList.add(`triangle-${i+6}`)
        clone.style.setProperty("--angle", `${(i * 60) + 60}deg`)
        document.querySelector(".bud").append(clone)
    }
    for (let i = 0; i < 6; i++) {
        const clone = triangle0.cloneNode(true)
        clone.classList.remove('triangle-0')
        clone.classList.remove('triangles')
        clone.classList.add(`triangles6`)
        clone.classList.add(`triangle-${i+6}`)
        clone.style.setProperty("--angle", `${(i * 60) + 60}deg`)
        document.querySelector(".bud").append(clone)
    }
}