import fs from 'fs/promises'
import yaml from 'js-yaml'

/**
 * @typedef {{
 *   names: [string, string]
 *   github: string
 *   prefix: string
 * }} Student
 * 
 * @typedef {{
 *   promotion: Student[]
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
