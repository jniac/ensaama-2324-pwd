import yaml from 'https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/+esm'

/**
 * @type {{
 *   entries: {
 *     url: string
 *     type: 'find-the-number' | 'colorful'
 *   }[]
 * }}
 */
export const data = await window
  .fetch('data.yaml')
  .then(response => response.text())
  .then(yaml.load)
