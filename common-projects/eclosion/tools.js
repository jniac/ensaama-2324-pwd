
export async function replaceByExternalRef() {
  const parser = new DOMParser()

  const selector = 'img[data-eclosion-replace-by-external-ref=yes]'
  
  /** @type {string[]} */
  const urls = [...document.querySelectorAll(selector)]
    .map(element => element.getAttribute('src'))
  
  const promises = urls
    .map(async url => {
      const res = await window.fetch(url)
      const str = await res.text()
      return parser.parseFromString(str, 'application/xhtml+xml').documentElement
    })

  const svgs = await Promise.all(promises)

  for (const [index, url] of urls.entries()) {
    const selector = `img[data-eclosion-replace-by-external-ref=yes][src="${url}"]`
    const elements = document.querySelectorAll(selector)
    for (const element of elements) {
      element.replaceWith(svgs[index].cloneNode(true))
    }
  }
}
