export function createDataSource() {
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

    const dataSource = []
    for (const _ of range(20)) {
        dataSource.splice(0, 0, ..._dataSourse)
    }
    return arrayShuffle.call(dataSource)
}

export function range(n) {
    return {
        [Symbol.iterator](){
            return this
        },
        counter: 0,
        next() {
            return this.counter < n ? {
                value: this.counter++,
                done: false
            } : {
                done: true
            }
        }
    }
}
function arrayShuffle() {
    var input = this;

    for (var i = input.length - 1; i >= 0; i--) {

        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}