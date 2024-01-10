const randFF = () => {
  return Math.floor(Math.random() * 255)
    .toString(16)
    .padStart(2, '0');
};
const randomColor = () => {
  return `#${randFF()}5599`;
};
const art = document.querySelector('.art');
const arrowUpSource = document.querySelector('.arrow.up');
const arrowDownSource = document.querySelector('.arrow.down');
arrowUpSource.remove();
arrowDownSource.remove();
export function addArrowUp(y) {

  const clone = arrowUpSource.cloneNode(true);
  clone.style.top = `${50 - y}%`;
  art.append(clone);

  //random gradient color
  const color = randomColor();
  const gradient = `linear-gradient(${color}, ${color}00)`;
  clone.querySelector('.right').style.backgroundImage = gradient;
  clone.querySelector('.left').style.backgroundImage = gradient;

  //dynamic angle
  const angle = (y) / 4;
  clone.style.setProperty('--angle', `${angle}deg`);
}
export function addArrowDown(y) {

  const clone = arrowDownSource.cloneNode(true);
  clone.style.bottom = `${50 - y}%`;
  art.append(clone);

  //random gradient color
  const color = randomColor();
  const gradient = `linear-gradient(${color}00, ${color})`;
  clone.querySelector('.right').style.backgroundImage = gradient;
  clone.querySelector('.left').style.backgroundImage = gradient;

  //dynamic angle
  const angle = (y) / 4;
  clone.style.setProperty('--angle', `${angle}deg`);
}


export function makeArt() {
  const max = 11;
  for (let i = 0; i < max; i++) {
    addArrowUp(i * 10);
    addArrowDown(i * 10);
  }
}

export function clearArt() {
  art.innerHTML = ''
}