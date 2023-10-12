import fs from 'fs/promises'
import { loadInfo } from './core.mjs'

const info = await loadInfo()

const csv = [
  '#,Prénom,Nom,github',
  ...info.promotion.map((s, i) => [i + 1, ...s.names, s.github].join(','))
].join('\n')

await fs.writeFile('../info/promotion.csv', csv, { encoding: 'utf-8' })

console.log('created info/promotion.csv')

