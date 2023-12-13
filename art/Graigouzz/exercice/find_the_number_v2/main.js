import { cleanArt, makeArtIntro } from './makeArtIntro.js'

makeArtIntro()

const input=document.querySelector('input')
input.onchange = () =>{
    cleanArt()
}

