export function clonePetalA() {
  const petal = document.querySelector('.lds .petal-a');
  for (let i = 1; i < 4; i++) {
    const clone = petal.cloneNode(true);
    clone.style.setProperty('--angle', `${(360 / 4) * i}deg`);
    petal.parentElement.append(clone);
  }
}

export function clonePetalB() {

  const petal = document.querySelector('.lds .petal-b');
  for (let i = 1; i < 4; i++) {
    const clone = petal.cloneNode(true);
    clone.style.setProperty('--angle', `${(360 / 4) * i}deg`);
    petal.parentElement.append(clone);
  }
}

