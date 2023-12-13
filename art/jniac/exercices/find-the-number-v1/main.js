import { clearArt, makeArtIntro } from './arrow.js'

makeArtIntro()

const input = document.querySelector('input')
input.onchange = () => {
  clearArt()
}
