import { data } from '../../eclosion/src/data.js'
import { setArtCount } from './art-indices.js'

const validWork = [
  'cxssandre',
  'ingrid-caz',
  'kevinhascoet',
  'ldssrt',
  'martindabo',
  'RSelaries',
  'SafiaHRCH',
]
export const eclosions = data.students
  .filter(person => validWork.includes(person.github))
  .map(person => ({ person, folder: 'final' }))

eclosions.push({ person: data.teacher, folder: 'final' })

setArtCount(eclosions.length)
