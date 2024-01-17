export function clonePetalA() {
  const petal = document.querySelector('.sah .petal-a');
  for (let i = 1; i < 25; i++) {
    const clone = petal.cloneNode(true);
    clone.style.setProperty('--angle', `${(360 / 25) * i}deg`);
    petal.parentElement.append(clone);
  }
}
