import { clearArt, makeArt } from './art.js';

makeArt()

const input = document.querySelector('input')
input.onchange = () => {
  clearArt()
}
