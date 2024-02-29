import fs from 'fs/promises'
import fetch from 'node-fetch'

const dst = '../common-resources/assets/fonts/fira-code'

await fs.mkdir(dst, { recursive: true })

const fontFaceCss = await fs.readFile('scripts/fira-code.css', 'utf-8')

// const fontFaceCss = await fetch('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap')
//   .then(response => response.text())

const re = /(?:\/\*\s.+\s\*\/)?[\s\S]*?@font-face\s\{([\s\S]+?)\}/g
const matches = [...fontFaceCss.matchAll(re)]

const fontFace2 = []

function normalizeFontFamily(family) {
  return family.split(/\s/).map(word => word.toLowerCase()).join('-')
}

for (const match of matches) {
  const [str, body] = match

  const lines = body
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)

  const entries = lines
    .map(line => line.split(/\:\s/))
    .map(([key, value]) => [key.trim(), value.trim().replace(/(;$)|"|'/g, '')])

  const record = Object.fromEntries(entries)
  const url = record.src.match(/url\((.+?)\)/)[1]
  const extension = url.match(/\.(\w+)$/)[1]
  const {
    'font-family': family = 'Fira Code',
    'font-style': style = 'normal',
    'font-weight': weight = '400',
  } = record

  const typeRaw = str.match(/\/\*\s.+\s\*\//)?.[0] || ''
  const type = typeRaw.slice(3, -3).trim()
  const filename = type
    ? `font-${weight}-${type}.${extension}`
    : `font-${weight}.${extension}`

  fontFace2.push(str.replace(/url\((.+?)\)/, `url(${filename})`))

  await fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => fs.writeFile(`${dst}/${filename}`, Buffer.from(buffer)))

  console.log(`Downloaded ${filename}`)
}

await fs.writeFile(`${dst}/font.css`, fontFace2.map(s => s.trim()).join('\n\n'))
