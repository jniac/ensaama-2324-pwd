import fs from 'fs/promises'
import yaml from 'js-yaml'

/**
 * @typedef {object} Student
 * @property {[string, string]} names
 * @property {string} github
 * @property {string} prefix
 * 
 * @typedef {object} Info
 * @property {Student[]} promotion
 */

/**
 * 
 * @returns {Promise<Info>}
 */
export async function loadInfo() {
  const str = await fs.readFile('../info/promotion.yaml', { encoding: 'utf-8' })
  return yaml.load(str)
}
