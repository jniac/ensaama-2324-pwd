const art = document.querySelector('.art');
const arrowUpSource = document.querySelector('.arrow.up');
const arrowDownSource = document.querySelector('.arrow.down');

// La "source" n'est plus nécessaire, on peut la retirer de l'écran:
arrowUpSource.remove();
arrowDownSource.remove();


export function addArrowUp(y) {
  const clone = arrowUpSource.cloneNode(true);
  clone.style.top = `${100 - y}%`;
  art.append(clone);

}
export function addArrowDown(y) {
  const clone = arrowDownSource.cloneNode(true);
  clone.style.bottom = `${100 - y}%`;
  art.append(clone);

}
export function makeArtIntro() {

  for (let i = 0; i < 20; i++) {

    addArrowUp(i * 5);

    addArrowDown(i * 5);

  }
  addArrowUp(20);
  addArrowDown(20);
}

export function clearArt() {

  art.innerHTML = ''
}
