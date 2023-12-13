
import { cleanArt, makeArtIntro } from './arrow.js'

makeArtIntro()

const input = document.querySelector('input')
input.onchange = () => {
    cleanArt ()

}
