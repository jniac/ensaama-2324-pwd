import yaml from 'https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/+esm'

const parser = new DOMParser()

/**
 * @typedef {{
 *   names: [string, string]
 *   github: string
 *   prefix: string
 * }} Person
 * 
 * @typedef {{
 *   teacher: Person
 *   students: Person[]
 * }} Data
 */

/**
 * @type {Data}
 */
export const data = await window
  .fetch('../../info/info.yaml')
  .then(response => response.text())
  .then(text => yaml.load(text))

async function fetchMainElement(url) {
  const response = await window.fetch(url)
  if (response.ok === false) {
    throw new Error(`Pas de index.html pour ${url}`)
  }
  const str = await response.text()
  const doc = parser.parseFromString(str, "text/html")
  const main = doc.querySelector('main')
  if (!main) {
    throw new Error(`Pas de <main/> dans ${url}`)
  }
  return main
}

async function fetchStyle(url) {
  const response = await window.fetch(url)
  if (response.ok === false) {
    throw new Error(`Pas de style.css pour ${url}`)
  }
  return await response.text()
}

export const arts = await Promise.all(
  [...data.students, data.teacher].map(async student => {
    const { github } = student
    // const github = 'jniac'
    
    /** @type {Error[]} */
    const errors = []
    /** @type {HTMLElement | null} */
    let mainElement = null
    /** @type {string | null} */
    let style = null

    try {
      mainElement = await fetchMainElement(`../../art/${github}/colorful/index.html`)
    } catch (error) {
      errors.push(error)
    }

    try {
      style = await fetchStyle(`../../art/${github}/colorful/style.css`)
    } catch (error) {
      errors.push(error)
    }

    if (mainElement === null || style === null) {
      const mainElement = document.createElement('main')
      mainElement.classList.add('center')
      mainElement.style.textAlign = 'center'
      mainElement.style.border = 'solid 1px #666'
      mainElement.innerHTML = `${student.github} (${student.names.join(' ')})<br>${errors.map(e => e.message).join('<br>')}`
      return { student, ok: false, style: '', mainElement }
    }

    return { student, ok: true, style, mainElement }
  })
)