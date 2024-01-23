import { data, fetchEclosion } from './data.js'

const entries = [...data.students, data.teacher]

/**
 * 
 * @param {import('./data.js').Person} person
 */
async function loadEclosion(person) {
  const { folder, doc } = await fetchEclosion(data.teacher)

  for (const img of doc.querySelectorAll('img')) {
    img.src = `${folder}/${img.getAttribute('src')}`
  }
  
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `../${folder}/style/style.css`
  
  document.head.append(link)

  const div = document.createElement('div')
  div.classList.add('eclosion', person.prefix)
  div.append(doc.body.querySelector('main'))
  div.append(doc.body.querySelector('.overlay'))
  
  document.body.append(div)
  
  import(`../${folder}/src/main.js`)
}

loadEclosion(entries.at(-1))
