export function clonePetalA() {
  const petal = document.querySelector('.mar .petal-a');
  for (let i = 1; i < 10; i++) {
    const clone = petal.cloneNode(true);
    clone.style.setProperty('--angle', `${(360 / 10) * i}deg`);
    petal.parentElement.append(clone);
  }
}
