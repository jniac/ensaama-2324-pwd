import fs from 'fs-extra'
import path from 'path'
import { loadInfo } from '../core.mjs'

const info = await loadInfo()


/**
 * 
 * @param {string} folder 
 * @returns 
 */
async function createFolders(folder) {
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
const result = await createFolders(unrealArtFolder)
console.log(`unreal folders: ${result}`)
