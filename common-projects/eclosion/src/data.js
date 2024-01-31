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

/**
 * 
 * @param {Person} person
 * @returns {Promise<{ folder: string, doc: Document }>}
 */
export async function fetchEclosion(person, folderName = 'final') {

  const folder = `../../art/${person.github}/eclosion/${folderName}`
  const index = `${folder}/index.html`
  const request = await window.fetch(index)
  const text = await request.text()
  const doc = parser.parseFromString(text, 'text/html')
  return {
    folder,
    doc,
  }
}
