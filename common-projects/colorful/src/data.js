import yaml from 'https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/+esm'

const parser = new DOMParser()

/**
 * @type {{
 *   promotion: {
 *     names: [string, string]
 *     github: string
 *     prefix: string
 *   }[]
 * }}
 */
export const data = await window
  .fetch('../../info/info.yaml')
  .then(response => response.text())
  .then(text => yaml.load(text))

export const arts = await Promise.all(
  data.promotion.map(async student => {
    const { github } = student
    // const github = 'jniac'
    try {
      const style = await window
        .fetch(`../../art/${github}/colorful/style.css`)
        .then(response => {
          if (response.ok) {
            return response.text()
          }
          throw new Error(`Pas de style.css pour ${github}`)
        })
      const mainElement = await window
        .fetch(`../../art/${github}/colorful/index.html`)
        .then(response => {
          if (response.ok) {
            return response.text()
          }
          throw new Error(`Pas de index.html pour ${github}`)
        })
        .then(text => {
          const doc = parser.parseFromString(text, "text/html")
          return doc.querySelector('main')
        })
      return { student, ok: true, style, mainElement }
    } catch (error) {
      const mainElement = document.createElement('main')
      mainElement.classList.add('center')
      mainElement.style.textAlign = 'center'
      mainElement.style.border = 'solid 1px #666'
      mainElement.innerHTML = `${student.github} (${student.names.join(' ')})<br>${error.message}`
      return { student, ok: false, style: '', mainElement }
    }
  })
)