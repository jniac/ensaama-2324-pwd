export function clonePetalA() {
  const petal = document.querySelector('.gra .petal-b');
  console.log(petal);
  for (let i = 1; i < 4; i++) {
    const clone = petal.cloneNode(true);
    const angle = `${(360 / 4) * i} deg`;
    clone.style.setProperty('--angle', `${(360 / 4) * i}deg`);

    petal.parentElement.append(clone);
  }
}


export function cloneBigPetal() {
  const petal = document.querySelector('.gra .petal-a');
  for (let i = 1; i < 4; i++) {
    const clone = petal.cloneNode(true);
    const angle = `${(360 / 4) * i} deg`;
    clone.style.setProperty('--angle', `${(360 / 4) * i}deg`);

    petal.parentElement.append(clone);
  }
}


