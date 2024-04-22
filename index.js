import { createDataSource } from "./datasource";

const dataSource = createDataSource()

const disk = document.querySelector(".disk")

const eventActions = [
    { 
        event: "mouseover", 
        action: ele => ele.style.transform += "scale(2)" 
    },
    { 
        event: "mouseout", 
        action: ele => ele.style.transform = ele.style.transform.replace("scale(2)", "") 
    }
]

eventActions.forEach(({ event, action }) => {
    disk.addEventListener(event, function (event) {
        const classes = Array.from(event.target.classList)
        if (classes.includes("highlight")) {
            const element = event.target
            action(element)
        }
    })
});


let deg = 0
let accumulatedWidth = 400
for (const word of dataSource) {
    const span = document.createElement("span")
    span.innerText = word
    disk.insertAdjacentElement("beforeend", span)
    const { offsetWidth } = span

    accumulatedWidth += offsetWidth * 0.5
    const transform = `translate(-50%, -50%) rotate(${deg}deg) translate(${accumulatedWidth}px)`

    span.style.transform = transform
    span.style.position = "absolute"

    requestIdleCallback(() => {
        span.style.transition = "all 0.3s ease 0s"

    })
    span.style.height = '16px'
    span.style.lineHeight = '16px'

    span.classList.add("highlight")
    span.dataset.deg = deg

    accumulatedWidth += 20
    accumulatedWidth += offsetWidth * 0.5

    if (accumulatedWidth > 800) {
        deg += 6
        accumulatedWidth = 400
    }
}


(function () {

    let deg = -30
    disk.style.transition = "all 0.2s"
    setInterval(() => {
        disk.style.transform = `rotate(${deg}deg)`
        deg -= 0.02
    }, 1000 / 60);
    disk.addEventListener("click", function (event) {

        const classes = Array.from(event.target.classList)
        if (classes.includes("highlight")) {

            const element = event.target
            const tagDeg = element.dataset.deg

            deg = - tagDeg
        }
    })
})()

