import { currentDocument, fadeIn } from './iframes.js'
import { wait } from './utils.js'
import { data } from './data.js'
import './fullscreen.js'

await wait(.5)

async function search() {
  const input = currentDocument().querySelector('input')

  await wait(2.5)

  let min = 0, max = 100
  const random = () => {
    const r = Math.random()
    const n = Math.floor(r * (max - min + 1)) + min
    if (r < .5) {
      min = n
    } else {
      max = n
    }
    return n
  }

  for (let i = 0; i < 5; i++) {
    input.value = random()
    input.dispatchEvent(new Event('input'))
    await wait(.5)
    input.dispatchEvent(new Event('change'))
    await wait(1.5)
  }
}

async function click() {
  await wait(1)
  
  const divs = [...currentDocument().querySelectorAll('main div')]
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      const div = divs[Math.floor(Math.random() * divs.length)]
      div.click()
    }
    await wait(1)
  }
}

let index = -1
async function next() {
  index = (index + 1) % data.entries.length
  const entry = data.entries[index]
  
  fadeIn(entry.url)
  
  await wait(1)
  
  if (entry.type === 'find-the-number') {
    await search()
  } else {
    await click()
  }

  await wait(1)
  
  next()
}

next()

