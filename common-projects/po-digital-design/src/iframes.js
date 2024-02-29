import { wait } from './utils.js'

const [iframe1, iframe2] = document.querySelectorAll('iframe')

let current = 0

function currentIframe() {
  return current === 0 ? iframe1 : iframe2
}

function otherIframe() {
  return current !== 0 ? iframe1 : iframe2
}

export function currentDocument() {
  return currentIframe().contentDocument
}

function consolidateUrl(url) {
  // Remove leading and trailing slashes
  url = url.replace(/^\/|\/$/g, '')

  if (/\:\d{3,5}$/.test(window.location.origin)) {
    return `${window.location.origin}/${url}`
  }

  if (/github.io$/.test(window.location.origin)) {
    const tokens = window.location.pathname.split('/').filter(s => s.length > 0)
    const repo = tokens[0]
    return `${window.location.origin}/${repo}/${url}`
  }

  console.log(`Unknown origin??? ${window.location.origin}`)
  return url
}

export async function fadeIn(url) {
  current = (current + 1) % 2

  const iframe = currentIframe()

  // Hiding the header from the iframe
  iframe.onload = () => {
    const style = iframe.contentDocument.createElement('style')
    style.innerHTML = ` header { display: none; }`
    iframe.contentDocument.head.appendChild(style)
  }

  const parent = iframe.parentElement
  iframe.classList.add('hidden')
  iframe.remove()
  parent.appendChild(iframe)
  iframe.src = consolidateUrl(url)
  await wait(0.1)
  iframe.classList.remove('hidden')
  await wait(1)
  otherIframe().classList.add('hidden')
}
