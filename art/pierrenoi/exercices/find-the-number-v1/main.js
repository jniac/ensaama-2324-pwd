@import { randFFFFFF } from '../../../../common-resources/js/'


const main = document.querySelector('main')
const arrowSource = document.querySelector('.arrow')

main.onclick = (event) => {
    const clone = arrowSource.cloneNode(true)
    clone.style.top = `${event.clientY}px`
    main.append(clone)
}

const color = randFFFFFF()
const linearGradient = `linear-`
