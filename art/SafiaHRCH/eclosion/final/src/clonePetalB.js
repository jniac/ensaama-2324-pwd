export function clonePetalB() {
  const petal = document.querySelector('.sah .petal-b');
  for (let i = 1; i < 6; i++) {
    const clone = petal.cloneNode(true);
    clone.style.setProperty('--angle', `${(360 / 6) * i}deg`);
    petal.parentElement.append(clone);
  }
}
