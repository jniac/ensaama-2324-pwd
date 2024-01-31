
export function clonePetalA() {
  const petal = document.querySelector('.ing .petal-a');
  for (let i = 1; i < 10; i++) {
    const clone = petal.cloneNode(true);
    clone.style.setProperty('--angle', ` ${36 * i}deg `);
    petal.parentElement.append(clone);
  }
}
