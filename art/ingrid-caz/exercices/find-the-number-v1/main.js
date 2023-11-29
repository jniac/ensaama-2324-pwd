
const main = document.querySelector('main')
const arrowSource = document.querySelector('.arrow')


main.onclick = (event) => {
    console.log(event.clientY)


    const clone = arrowSource.cloneNode(true)
    clone.style.top = `${event.clientY}px`
    main.append(clone)
}


