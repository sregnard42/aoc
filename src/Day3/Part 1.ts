import readFileIntoDataArray from "../readFileIntoDataArray"

const data = readFileIntoDataArray("./Day 3/Input.txt")

const parseNumber = (data: string[], x: number, y: number) => {
    const number = parseInt(data[y].slice(x))
    return isNaN(number) ? null : number
}

const isSymbol = (c: string) => {
    if (c === ".") {
        return false
    }
    if (c >= "0" && c <= "9") {
        return false
    }
    return true
}

const isNumberAdjacentToSymbol = (
    data: string[],
    number: number,
    x: number,
    y: number,
) => {
    const startX = Math.max(x - 1, 0)
    const endX = Math.min(x + number.toString().length + 1, data[y].length)
    let characters: string = ""
    characters += data[y - 1]?.slice(startX, endX) ?? ""
    characters += data[y]?.slice(startX, endX) ?? ""
    characters += data[y + 1]?.slice(startX, endX) ?? ""
    let i = 0
    while (i < characters.length) {
        if (isSymbol(characters[i])) {
            return true
        }
        i++
    }
    return false
}

const partNumbers: number[] = []
for (let y = 0; y < data.length; y++) {
    let x = 0
    while (x < data[y].length) {
        const c = data[y][x]
        if (c === "." || isSymbol(c)) {
            x++
            continue
        }
        const number = parseNumber(data, x, y)
        if (number && isNumberAdjacentToSymbol(data, number, x, y)) {
            partNumbers.push(number)
        }
        x += number?.toString()?.length ?? 1
    }
}

const sum = partNumbers.reduce((a, b) => a + b, 0)
console.log(sum)
