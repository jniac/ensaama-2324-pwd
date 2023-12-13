import { randFFFFFF } from "../../../../common-resources/js/color-utils.js";

const main = document.querySelector('main')
const arrowUpSource = document.querySelector('.arrow.up')
const arrowDownSource = document.querySelector('.arrow.down')

arrowUpSource.remove ()
arrowDownSource.remove ()

function addArrowUp(y) {
    const clone = arrowUpSource.cloneNode(true)
    clone.style.top = `${100 - y}%`
    main.append(clone)
}

function addArrowDown(y) {
    const clone = arrowDownSource.cloneNode(true)
    clone.style.bottom = `${100 - y}%`
    main.append(clone)
}


for (let i = 0; i <10; i++) {
    addArrowUp(i *10)
    addArrowDown(i *10)

}
