export function clonePetal() {
  const petal = document.querySelector('.cxs .petal');
  for (let i = 1; i < 10; i++) {
    const clone = petal.cloneNode(true);
    clone.style.setProperty('--angle', `${(360 / 10) * i}deg`);
    petal.parentElement.append(clone);
  }
}
