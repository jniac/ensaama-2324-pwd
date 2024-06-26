import yaml from 'https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.mjs'

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
 * }} Info
 * 
 * @typedef {{
 *   grade: number
 *   document?: string
 *   comment: string | string[]
 * }} Evaluation
 *
 * @typedef {{
 *   exercise: string
 *   [key: string]: Evaluation
 * }} Exercise
 */

async function get(url) {
  const res = await window.fetch(url)
  const str = await res.text()
  try {
    return yaml.load(str)
  } catch (error) {
    const { snippet } = error.mark
    console.log(snippet)
    throw error
  }
}

/**
 * Load and deserialize info.yaml
 * @returns {Promise<Info>}
 */
export async function loadInfo() {
  return await get('../info.yaml')
}

/**
 * Load and deserialize info.yaml
 * @returns {Promise<Exercise[]>}
 */
export async function loadExercise() {
  return [
    await get('../exercise-evaluation/colorful.yaml'),
    await get('../exercise-evaluation/find-the-number.yaml'),
    await get('../exercise-evaluation/eclosion-scroll.yaml'),
    await get('../exercise-evaluation/eclosion-ue5.yaml'),
  ]
}
