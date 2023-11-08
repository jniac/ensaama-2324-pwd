import fs from 'fs/promises'
import { loadInfo } from './core.mjs'

const info = await loadInfo()

const csv = [
  '#,Prénom,Nom,github,prefix',
  ...info.students.map((s, i) => [i + 1, ...s.names, s.github, s.prefix].join(','))
].join('\n')

await fs.writeFile('../info/students.csv', csv, { encoding: 'utf-8' })

console.log('created info/students.csv')

