document.querySelector(`.toggle-button`).onclick = () => {
    const sections = document.querySelectorAll("section")

    for(const section of sections) {
        section.classList.toggle('hidden')
    }


    const divs = document.querySelectorAll('section > div')
    
    for (const div of divs) {
        const duration = Math.random() * 1.3 + 0.4
        const hue = Math.random() * 360
        const alpha = Math.random() * 0.2 + 0.4

        const rdmRange = 10
        const rdm1 = Math.random() * rdmRange - (rdmRange / 2)
        const rdm2 = Math.random() * rdmRange - (rdmRange / 2)

        div.style.transitionDuration = `${duration.toFixed(3)}s`
        div.style.backgroundColor = `hsla(${hue.toFixed(5)}, 86%, 59%, ${alpha})`
        div.style.transitionTimingFunction = `cubic-bezier(1,${rdm1}, 0, ${rdm2})`
    }
};