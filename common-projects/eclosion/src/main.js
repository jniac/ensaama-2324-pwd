import { positiveModulo } from '../../../common-resources/js/math-utils.js'
import { data, fetchEclosion } from './data.js'
import { instanceManager, scrollManager } from './eclosion.js'

const entries = [...data.students, data.teacher]

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
  div.append(doc.body.querySelector('main'))
  div.append(doc.body.querySelector('.overlay'))
  
  document.body.append(div)
  
  // main.js is one folder lower than index.html, so we need to go up one level more.
  const { main } = await import(`../${folder}/src/main.js`)

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

const foo = [
  [data.teacher, 'final'],
  [data.teacher, 'final-2'],
  [data.teacher, 'final-3'],
]

/** @type {Map<number, { destroy: () => void }>} */
const eclosions = new Map()

scrollManager.onRequireEclosion(index => {
  index = positiveModulo(index, foo.length)
  loadEclosion(...foo[index])
  .then(eclosion => eclosions.set(index, eclosion))
})

scrollManager.onDisposeEclosion(index => {
  index = positiveModulo(index, foo.length)
  eclosions.get(index).destroy()
})

scrollManager.noMinMax()
scrollManager.updateScroll(0)

