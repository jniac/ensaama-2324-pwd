import { initEclosion } from "../../../../common-projects/eclosion/src/eclosion.js"
import {
    replaceByExternalRef,
    svgFactory,
} from "../../../../common-projects/eclosion/src/tools.js"
import { clamp, inverseLerp } from "../../../../common-resources/js/math-utils.js"
import { clonePetalA, clonePetalB, clonePetalC } from "./clonePetalA.js"

function main() {
    /** @type {HTMLElement} */
    const root = document.querySelector(".rse")

    replaceByExternalRef()
    initEclosion("rse", (scroll) => {
        root.style.setProperty( "--scroll-1", inverseLerp(0.0, 0.5, scroll).toFixed(3) )
        root.style.setProperty( "--scroll-2", inverseLerp(0.485, 1, scroll).toFixed(3) )
        root.style.setProperty( "--scroll-big", (inverseLerp(0, 1, scroll) * 2).toFixed(3) )
        root.style.setProperty( "--scroll-3", (inverseLerp(0.7, 1, scroll)).toFixed(3) )
        root.style.setProperty( "--scroll-4", (inverseLerp(0.9, 1, scroll)).toFixed(3) )
    })

    const d = svgFactory.path.polygon(6, 120, { offsetTurn: 1 / 12 })

    const hexagone = () => svgFactory.createNode(`<path d="${d}"/>`)

    document.querySelector(".core svg").append(hexagone())
    document.querySelector(".petals svg").append(hexagone())
    // document.querySelector(".petal-4 svg").append(hexagone())
    document.querySelector(".big-petal-0 svg").append(hexagone())

    clonePetalA()
    clonePetalB()
    clonePetalC()

}

main()

export { main }
