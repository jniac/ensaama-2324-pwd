import { initEclosion } from '../../../../../common-projects/eclosion/src/eclosion.js'
import { replaceByExternalRef } from '../../../../../common-projects/eclosion/src/tools.js'

replaceByExternalRef()
initEclosion('par')

function clonePetalA(count = 4) {
  const petal = document.querySelector('.par .petal-a')
  for (let i = 1; i < count; i++) {
    const clone = petal.cloneNode(true)
    const angle = `${(360 / count) * i}deg`
    clone.style.setProperty('--angle', angle) 
    petal.parentElement.append(clone)
  }
}

function clonePetalB(count = 4) {
  const petal = document.querySelector('.par .petal-b')
  for (let i = 1; i < count; i++) {
    const clone = petal.cloneNode(true)
    const angle = `${(360 / count) * i}deg`
    clone.style.setProperty('--angle', angle) 
    petal.parentElement.append(clone)
  }
}

function clonePetalC(count = 17) {
  const petal = document.querySelector('.par .petal-c')
  for (let i = 1; i < count; i++) {
    const clone = petal.cloneNode(true)
    const angle = `${(360 / count) * i}deg`
    clone.style.setProperty('--angle', angle) 
    petal.parentElement.append(clone)
  }
}

clonePetalA()
clonePetalB()
clonePetalC()