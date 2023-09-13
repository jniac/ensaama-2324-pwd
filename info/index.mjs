import yaml from 'js-yaml'
import fs from 'fs/promises'

fs.readFile('promotion.yaml', { encoding: 'utf-8' }).then(str => {
  /** @type {{ students: { names: [string, string], github: string }[] }} */
  const doc = yaml.load(str)
  const csv = [
    '#,Prénom,Nom,github',
    ...doc.students.map((s, i) => [i + 1, ...s.names, s.github].join(','))
  ].join('\n')
  fs.writeFile('promotion.csv', csv, { encoding: 'utf-8' })
})
