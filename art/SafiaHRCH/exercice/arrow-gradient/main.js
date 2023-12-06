
import { cleanArt, makeArtIntro } from "./arrow.js"

makeArtIntro()

const input = document.querySelector('input')
input.onchange = () => {
    console.log(input.value)
    cleanArt()
}