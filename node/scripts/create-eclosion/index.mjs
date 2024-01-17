import fs from 'fs/promises'
import path from 'path'
import { loadInfo } from '../core.mjs'

const info = await loadInfo()

for (const student of info.students) {
  fs.cp('../art/jniac/eclosion/final', `../art/${student.github}/eclosion/final`, { recursive: true })
}
