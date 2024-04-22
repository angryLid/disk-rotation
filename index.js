import { createDataSource } from "./datasource";

const dataSource = createDataSource()

const disk = document.querySelector(".disk")

function createHandler(callback) {
    return function (event) {
        const classes = Array.from(event.target.classList)
        if (classes.includes("text")) {
            const element = event.target
            callback(element)
        }
    }
}

disk.addEventListener("mouseover", createHandler(ele => ele.style.transform += "scale(2)"))
disk.addEventListener("mouseout", createHandler(ele => ele.style.transform = ele.style.transform.replace("scale(2)", "")))


!function insertTexts() {
    const INNER_RADIUS = 400
    const OUTER_RADIUS = 800
    const DELTA_DEG = 6
    const TEXT_GAP = 20

    let deg = 0
    let translationWidth = 400

    for (const word of dataSource) {
        const span = document.createElement("span")
        span.innerText = word
        disk.insertAdjacentElement("beforeend", span)
        const { offsetWidth } = span

        span.classList.add("text")
        span.dataset.deg = deg

        translationWidth += offsetWidth * 0.5

        span.style.transform =
            `translate(-50%, -50%) rotate(${deg}deg) translate(${translationWidth}px)`

        requestIdleCallback(() => {
            span.style.transition = "all 0.3s ease 0s"
        })

        translationWidth += TEXT_GAP
        translationWidth += offsetWidth * 0.5

        if (translationWidth > OUTER_RADIUS) {
            deg += DELTA_DEG
            translationWidth = INNER_RADIUS
        }
    }
}()

!function rotate() {

    let deg = -30
    disk.style.transition = "all 0.2s"
    setInterval(() => {
        disk.style.transform = `rotate(${deg}deg)`
        deg -= 0.02
    }, 1000 / 60);

    disk.addEventListener("click", createHandler (ele => deg = -ele.dataset.deg))
}()


