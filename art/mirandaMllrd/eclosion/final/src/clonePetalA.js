export function clonePetalA() {
  const petal = document.querySelector('.mir .petal-a');
  for (let i = 1; i < 30; i++) {
    const clone = petal.cloneNode(true);
    const angle = `${(360 / 4) * i} deg`;
    clone.style.setProperty('--angle', `${(360 / 30) * i}deg`);
    petal.parentElement.append(clone);
  }
}
