import { data } from './data.js'

const entries = [...data.students, data.teacher]

/**
 * 
 * @param {import('./data.js').Person} person
 */
function fetchEclosion(person) {
  const folder = `../../art/${person.github}/eclosion/final`
  const index = `${folder}/index.html`
}
