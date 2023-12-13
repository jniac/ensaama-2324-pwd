const randFF = () => {
  return Math.floor(Math.random() * 0xff)
    .toString(16)
    .padStart(2, '0');
};
const randomColor = () => {
  return `#${randFF()}${randFF()}99`;
};
const main = document.querySelector('main');
const arrowUpSource = document.querySelector('.arrow.up');
const arrowDownSource = document.querySelector('.arrow.down');
arrowUpSource.remove();
arrowDownSource.remove();
function addArrowUp(y) {

  const clone = arrowUpSource.cloneNode(true);
  clone.style.top = `${50 - y}%`;
  main.append(clone);

  //random gradient color
  const color = randomColor();
  const gradient = `linear-gradient(${color}, ${color}00)`;
  clone.querySelector('.right').style.backgroundImage = gradient;
  clone.querySelector('.left').style.backgroundImage = gradient;

  //dynamic angle
  const angle = (y) / 4;
  clone.style.setProperty('--angle', `${angle}deg`);
}
function addArrowDown(y) {

  const clone = arrowDownSource.cloneNode(true);
  clone.style.bottom = `${50 - y}%`;
  main.append(clone);

  //random gradient color
  const color = randomColor();
  const gradient = `linear-gradient(${color}00, ${color})`;
  clone.querySelector('.right').style.backgroundImage = gradient;
  clone.querySelector('.left').style.backgroundImage = gradient;

  //dynamic angle
  const angle = (y) / 4;
  clone.style.setProperty('--angle', `${angle}deg`);
}
function makeArt() {
  const max = 11;
  for (let i = 0; i < max; i++) {
    addArrowUp(i * 10);
    addArrowDown(i * 10);
  }
}


makeArt()