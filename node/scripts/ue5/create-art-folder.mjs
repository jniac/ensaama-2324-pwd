import fs from 'fs-extra'
import path from 'path'
import { loadInfo } from '../core.mjs'

const info = await loadInfo()

console.log(info)

/**
 * 
 * @param {string} folder 
 * @param {(student: Student) => string} fileNamePredicate 
 * @returns 
 */
async function createFolders(folder, fileNamePredicate = student => student.github) {
  for (const student of [...info.students, info.teacher]) {
    const readme = path.join(folder, `${student.prefix}_${student.github}/README.md`)
    console.log(readme)
    if (await fs.exists(readme) === false) {
      console.log(`creating ${readme}`)
      await fs.createFile(readme)
      await fs.writeFile(readme, `
# ${student.prefix}_${student.github}

Dossier de travail de ${student.names.join(' ')}
      `)
    }
  }
}

const unrealArtFolder = '/Users/joseph/Documents/Unreal Projects/ENSAAMA_PWD_2324_UE5/Content/Art'
const result = await createFolders(unrealArtFolder, ({ prefix, github }) => `${prefix}_${github}`)
console.log(`unreal folders: ${result}`)
