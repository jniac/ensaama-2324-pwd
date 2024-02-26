import yaml from 'https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/+esm'

/**
 * @type {{
 *   entries: {
 *     url: string
 *   }[]
 * }}
 */
const data = await window
  .fetch('data.yaml')
  .then(response => response.text())
  .then(yaml.load)

const [iframe1, iframe2] = document.querySelectorAll('iframe')
let current = 0

function currentIframe() {
  return current === 0 ? iframe1 : iframe2
}

function otherIframe() {
  return current !== 0 ? iframe1 : iframe2
}

async function fadeIn(url) {
  current = (current + 1) % 2
  const iframe = currentIframe()
  const parent = iframe.parentElement
  iframe.classList.add('hidden')
  iframe.remove()
  parent.appendChild(iframe)
  iframe.src = url
  await wait(.1)
  iframe.classList.remove('hidden')
  await wait(1)
  otherIframe().classList.add('hidden')
}

function wait(seconds) {
  return new Promise(resolve => window.setTimeout(resolve, seconds * 1000))
}

await wait(.5)

let index = -1
async function next() {
  index = (index + 1) % data.entries.length
  fadeIn(data.entries[index].url)

  await wait(5)
  next()
}

next()
