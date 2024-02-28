import { positiveModulo } from '../../../common-resources/js/math-utils.js'
import { data, fetchEclosion } from './data.js'
import { instanceManager, scrollManager } from './eclosion.js'

document.querySelector('button.fullscreen').addEventListener('click', () => {
  document.documentElement.requestFullscreen()
})

const cache = new Map()

/**
 * This is tricky. We need to retrieve the identifier from the classList of the 
 * loaded document. The identifier would normally be the first token of only 3
 * characters (ex "jnc"), but for testing purposes, longer identifiers are used
 * (ex "jnc-foo-bar").
 * @param {DOMTokenList} classList 
 * @returns 
 */
function retrieveIdentifierFromClassList(classList) {
  const candidates = [...classList]
    .filter(c => {
      const firstToken = c.split('-')[0]
      if (firstToken.length !== 3)
        return false
      return true
    })
  if (candidates.length !== 1)
    throw new Error('No identifier found in classList.')
  return candidates[0]
}

/**
 * 
 * @param {import('./data.js').Person} person
 */
async function loadEclosion(person, folderName = 'final') {
  const { folder, doc } = await fetchEclosion(person, folderName)

  for (const img of doc.querySelectorAll('img')) {
    img.src = `${folder}/${img.getAttribute('src')}`
  }
  
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `${folder}/style/style.css`
  
  document.head.append(link)

  const identifier = retrieveIdentifierFromClassList(doc.body.classList)

  const div = document.createElement('div')
  div.className = doc.body.className
  div.style.setProperty('visibility', 'hidden')
  div.append(doc.body.querySelector('main'))
  div.append(doc.body.querySelector('.overlay'))
  
  document.body.append(div)
  
  // main.js is one folder lower than index.html, so we need to go up one level more.
  const mainModule = await import(`../${folder}/src/main.js`)
  const { main } = mainModule
  if (main === undefined) {
    console.warn(`No main() function found in ${folder}/src/main.js.`)
  }
  
  // main() is executed only if it has not been cached yet (when reloading the eclosion occurs).
  if (cache.has(identifier) === false) {
    cache.set(identifier, main)
  } else {
    main()
  }

  const destroy = () => {
    instanceManager.disposeEclosion(identifier)
    div.remove()
    link.remove()
    doc.documentElement.innerHTML = ''
  }

  return { destroy }
}

// const loadEntries = [
//   [data.teacher, 'final'],
//   [data.teacher, 'final-2'],
//   [data.teacher, 'final-3'],
// ]

const validWork = [
  'cxssandre',
  'ingrid-caz',
  'kevinhascoet',
  'ldssrt',
  'martindabo',
  'RSelaries',
  'SafiaHRCH',
]

const loadEntries = data.students
  .filter(s => validWork.includes(s.github))
  .map(s => [s, 'final'])

loadEntries.push([data.teacher, 'final-2'])

/** @type {Map<number, { destroy: () => void }>} */
const loadedEclosions = new Map()

scrollManager
  .onRequireEclosion(index => {
    // We cannot load the eclosion right now, so we have to push the index in a 
    // queue that will be retrieved later through the initEclosion() function.
    instanceManager.indexQueue.push(index)

    const loadIndex = positiveModulo(index, loadEntries.length)
    loadEclosion(...loadEntries[loadIndex])
      .then(eclosion => loadedEclosions.set(loadIndex, eclosion))
  })
  .onDisposeEclosion(index => {
    const loadIndex = positiveModulo(index, loadEntries.length)
    loadedEclosions.get(loadIndex).destroy()
  })
  .noMinMax()

Object.assign(window, { scrollManager })
