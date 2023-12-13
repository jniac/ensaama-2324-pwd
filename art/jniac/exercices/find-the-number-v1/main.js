import { clearArt, makeArtIntro } from './art.js'

makeArtIntro()

const input = document.querySelector('input')
input.onchange = () => {
  clearArt()
}
