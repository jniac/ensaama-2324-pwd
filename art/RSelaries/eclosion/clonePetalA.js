export function clonePetalA() {
  const petal = document.querySelector(".rse .petal-a");
  for (let i = 1; i < 3; i++) {
      const clone = petal.cloneNode(true);
      clone.style.setProperty("--angle", ` ${120 * i}deg `);
      petal.parentElement.append(clone);
  }
}