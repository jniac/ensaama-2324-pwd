

import { makeArtIntro } from './art.js'


makeArtIntro()

const input = document.querySelector('input')
input.onchange = () => {
    console.log(input.value)
    clearArt()
}