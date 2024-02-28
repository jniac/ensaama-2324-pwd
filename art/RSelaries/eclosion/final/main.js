import { initEclosion } from "../../../../common-projects/eclosion/src/eclosion.js"
import {
    replaceByExternalRef,
    svgFactory,
} from "../../../../common-projects/eclosion/src/tools.js"
import {
    clamp,
    inverseLerp,
} from "../../../../common-resources/js/math-utils.js"
import { clonePetalA, clonePetalB, clonePetalC, cloneTriangle, cloneTriangle1, cloneTriangle2 } from "./clonePetalA.js"

function main() {
    /** @type {HTMLElement} */
    const root = document.querySelector(".rse")

    replaceByExternalRef()
    initEclosion("rse", (scroll) => {
        root.style.setProperty(
            "--scroll-1",
            inverseLerp(0.0, 0.5, scroll).toFixed(3)
        )
        root.style.setProperty(
            "--scroll-2",
            inverseLerp(0.485, 1, scroll).toFixed(3)
        )
        root.style.setProperty(
            "--scroll-big",
            (inverseLerp(0, 1, scroll) * 2).toFixed(3)
        )
        root.style.setProperty(
            "--scroll-3",
            inverseLerp(0.7, 1, scroll).toFixed(3)
        )
        root.style.setProperty(
            "--scroll-4",
            inverseLerp(0.9, 1, scroll).toFixed(3)
        )
        root.style.setProperty(
            "--scroll-5",
            inverseLerp(0.85, 1, scroll).toFixed(3)
        )
    })

    const d = svgFactory.path.polygon(6, 120, { offsetTurn: 1 / 12 })
    const tri = svgFactory.path.polygon(3, 60)

    const hexagone = () => svgFactory.createNode(`<path d="${d}"/>`)
    const triangleConstructor = () => svgFactory.createNode(`<path d="${tri}" />`)
    // const svg = () => document.createElement("svg", { viewBox:"-400 -400 800 800" })
    // const triangle = () => document.createElement("svg").appendChild(triangleConstructor())
    const triangle = () => document.createElementNS("http://www.w3.org/2000/svg", "svg").appendChild(triangleConstructor())

    document.querySelector(".core svg").append(hexagone())
    document.querySelector(".petals svg").append(hexagone())
    document.querySelector(".big-petal-0 svg").append(hexagone())

    document.querySelector(".big-petal-0 svg").append(hexagone())
    document.querySelector(".triangle-0 svg").append(triangleConstructor())

    clonePetalA()
    clonePetalB()
    clonePetalC()
    cloneTriangle()
    cloneTriangle1()
    cloneTriangle2()
}

main()

export { main }
