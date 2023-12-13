import { clearArt, makeArtIntro } from './makeArtIntro.js'

makeArtIntro()

const input=document.querySelector('input')
input.onchange = () =>{
    clearArt()
}

