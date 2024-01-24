export function clonePetalA() {
  const petal = document.querySelector('.kev .petal-a');
  for (let i = 1; i < 8; i++) {
    const clone = petal.cloneNode(true);
    clone.style.setProperty('--angle', `${(360 / 8) * i}deg`);
    petal.parentElement.append(clone);
  }
}
