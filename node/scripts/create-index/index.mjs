import fs from 'fs/promises'
import path from 'path'
import { loadInfo } from '../core.mjs'

const info = await loadInfo()

const indexHtmlFilename = path.join(path.dirname(import.meta.url).slice(5), 'index.html')
const indexHtml = await fs.readFile(indexHtmlFilename, 'utf-8')

