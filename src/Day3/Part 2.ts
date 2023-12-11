import readFileIntoDataArray from "../readFileIntoDataArray"

const data = readFileIntoDataArray("./Day 3/Input.txt")

const isDigit = (c: string) => c >= "0" && c <= "9"

const parseNumber = (x: number, y: number) => {
    let curX = x
    while (curX > 0 && isDigit(data[y][curX - 1]) === true) {
        curX--
    }
    return parseInt(data[y].slice(curX))
}

const gearRatios: number[] = []

const parseAdjacentNumbers = (x: number, y: number) => {
    const startX = Math.max(x - 1, 0)
    const endX = Math.min(x + 1, data[y].length - 1)
    
    const startY = Math.max(y - 1, 0)
    const endY = Math.min(y + 1, data.length - 1)
    
    const partNumbers: number[] = []
    
    let curY = startY
    while (curY <= endY) {
        let curX = startX
        while (curX <= endX) {
            if (isDigit(data[curY][curX])) {
                const number = parseNumber(curX, curY)
                partNumbers.push(number)
                if (partNumbers.length > 2) {
                    return
                }
                while (curX <= endX && isDigit(data[curY][curX]) === true) {
                    curX++
                }
                continue
            }
            curX++
        }
        curY++
    }

    if (partNumbers.length === 2) {
        gearRatios.push(partNumbers.reduce((a, b) => a * b, 1))
    }
}

for (let y = 0; y < data.length; y++) {
    let x = 0
    while (x < data[y].length) {
        const c = data[y][x]
        if (c !== "*") {
            x++
            continue
        }
        parseAdjacentNumbers(x, y)
        x++
    }
}

const sum = gearRatios.reduce((a, b) => a + b, 0)
console.log(sum)
