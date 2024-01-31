
export function clonePetalA({
  count = 20, 
  radius = 100,
  className = "foo",
}) {
  const petal = document.querySelector('.mir .petal-a');
  for (let i = 0; i < count; i++) {
    const clone = petal.cloneNode(true);
    clone.style.removeProperty('display')
    clone.classList.add(className)
    clone.style.setProperty('--angle', `${(360 / count) * i}deg`);
    clone.style.setProperty('--radius', `${radius}px`);
    petal.parentElement.append(clone);
  }
}
