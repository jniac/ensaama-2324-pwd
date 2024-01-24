export function clonePetalA() {
    const petal = document.querySelector(".rse .petal-1");
    for (let i = 1; i < 3; i++) {
        const clone = petal.cloneNode(true);
        clone.classList.remove('petal-1')
        clone.classList.add(`petal-${i+1}`)
        clone.style.setProperty("--angle", ` ${120 * i}deg `);
        petal.parentElement.append(clone);
    }
}
