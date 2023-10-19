import fs from 'fs/promises'
import { loadInfo } from './core.mjs'

const info = await loadInfo()

const studentFiles = info.students.map(student => student.github)
const existingFiles = await fs.readdir('../art')

const missingFiles = studentFiles.filter(file => {
  return existingFiles.includes(file) === false
})

const extraFiles = existingFiles.filter(file => {
  return studentFiles.includes(file) === false
})

console.log(`
  missing files: ${missingFiles.join(', ')}
  extra files: ${extraFiles.join(', ')}
`)