import { PRNG } from '../../../common-resources/js/prng.js'

/** 
 * Table of correspondance between scroll index and art index. 
 * @type {Map<number, number>} 
 */
const map = new Map()

let artCount = 10
let artIndices = Array.from({ length: artCount }, (_, i) => i)

function setArtCount(count) {
  map.clear()
  artCount = count
  artIndices = Array.from({ length: artCount }, (_, i) => i)
}

function getArtIndexDistance(scrollIndex, artIndex, maxDistance = 4) {
  if (map.has(scrollIndex) && map.get(scrollIndex) === artIndex) {
    return 0
  }
  let distance = 1
  while (distance < maxDistance) {
    const left = scrollIndex - distance, right = scrollIndex + distance
    if ((map.has(left) && map.get(left) === artIndex) || (map.has(right) && map.get(right) === artIndex)) {
      return distance
    }
    distance++
  }
  return maxDistance
}

/**
 * @param {number} scrollIndex 
 * @returns {number}
 */
function getArtIndex(scrollIndex) {
  if (map.has(scrollIndex)) {
    return map.get(scrollIndex)
  }
  const weights = artIndices.map(artIndex => (getArtIndexDistance(scrollIndex, artIndex) - 1) ** 2)
  const artIndex = PRNG.amongWeighted(artIndices, weights)
  map.set(scrollIndex, artIndex)
  return artIndex
}

export {
  setArtCount,
  getArtIndex,
}