const _dataSourse = [
    "Python",
    "JavaScript",
    "Go",
    "Electron",
    "Elasticsearch",
    "Ruby on Rails",
    "Next.JS, TailwindCSS and Vercel",
    "Rust",
    "Swift",
    "Vue",
]

const range = n => Array(n).fill(null).map((_, idx) => idx)

const dataSource = []
for(const _ in range(20)){
    dataSource.splice(0, 0, ..._dataSourse)
}

const disk = document.querySelector(".disk")
disk.addEventListener("mouseover", function(event) {
// return
    const classes = Array.from(event.target.classList)
    if(classes.includes("highlight")){

        const element = event.target
        element.style.transform += "scale(2)"
        
        
    }
})

disk.addEventListener("mouseout", function(event) {

    const classes = Array.from(event.target.classList)
    if(classes.includes("highlight")){

        const element = event.target
        element.style.transform = element.style.transform.replace("scale(2)", "")
        
    }
})
let deg = 0
let accumulatedWidth = 400
for(const word of dataSource){
    const span = document.createElement("span")
    span.innerText = word
    disk.insertAdjacentElement("beforeend", span)
    const { offsetWidth } = span

    accumulatedWidth += offsetWidth * 0.5
    const transform = `translate(-50%, -50%) rotate(${deg}deg) translate(${accumulatedWidth}px)`
    // const transform = `rotate(${deg}deg) translate(${accumulatedWidth}px)`
    // span.style.transformOrigin = "top left"

    span.style.transform = transform
    span.style.position = "absolute"
    // span.style.transition = "all 0.3s ease 0s"
    requestIdleCallback(() => {
        span.style.transition = "all 0.3s ease 0s"

    })
    span.style.height = '16px'
    span.style.lineHeight = '16px'
    // span.style.width = `${offsetWidth * 2}px`
    // span.style.display = "flex"
    // span.style.justifyContent = "center"
    span.classList.add("highlight")
    span.dataset.deg = deg
 
    accumulatedWidth += 20
    accumulatedWidth += offsetWidth * 0.5

    if(accumulatedWidth > 800){
        deg += 6
        accumulatedWidth = 400
    } 
}


(function (){

    let deg = -30
    disk.style.transition = "all 0.2s"
    setInterval(() => {
        disk.style.transform = `rotate(${deg}deg)`
        deg -= 0.02
    }, 1000/60);
    disk.addEventListener("click", function(event) {

        const classes = Array.from(event.target.classList)
        if(classes.includes("highlight")){
    
            const element = event.target
            const tagDeg = element.dataset.deg
            // tagDeg + deg + x = 0
            deg = - tagDeg
        }
    })
})()

