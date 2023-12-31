import fs from 'fs/promises'
import yaml from 'js-yaml'

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
 */

/**
 * Load and deserialize info.yaml
 * @returns {Promise<Info>}
 */
export async function loadInfo() {
  const str = await fs.readFile('../info/info.yaml', { encoding: 'utf-8' })
  return yaml.load(str)
}

export async function saveInfo(info) {
  const str = yaml.dump(info, { noArrayIndent: true })
  return str
}

console.log(await saveInfo(await loadInfo()))