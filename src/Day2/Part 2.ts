import readFileIntoDataArray from "../readFileIntoDataArray"

const data = readFileIntoDataArray("./Day 2/Input.txt")
/** 
  'Game 1: 12 blue; 2 green, 13 blue, 19 red; 13 red, 3 green, 14 blue',
  'Game 2: 12 blue, 1 red, 1 green; 1 red, 12 blue, 3 green; 5 green, 1 red, 9 blue; 1 red, 7 blue, 4 green',
  'Game 3: 1 red; 12 blue, 15 red; 1 green, 10 red, 2 blue; 1 green, 3 red, 9 blue',
  'Game 4: 6 blue, 5 green; 2 blue, 6 green, 6 red; 11 blue, 5 red; 6 green, 11 red, 7 blue; 4 green, 10 red; 1 green, 7 red, 13 blue',
 **/

interface Game {
    id: string
    red: number
    green: number
    blue: number
    power: number
}

// Regex rules
// Game $id : $nb $color, $nb $color, ...

const countColor = (data: string, color: string): number => {
    const colorPattern = new RegExp(`(\\d+) ${color}`, "g")
    let match: RegExpExecArray | null
    let numbers: number[] = []
    while ((match = colorPattern.exec(data)) !== null) {
        const number = parseInt(match[1], 10)
        numbers.push(number)
    }
    return Math.max(...numbers)
}

const parseLine = (data: string): Game => {
    const id = data.match(/Game (\d+):/)?.[1] ?? "None"
    const red = countColor(data, "red")
    const green = countColor(data, "green")
    const blue = countColor(data, "blue")
    return { id, red, green, blue, power: red * green * blue }
}

const games: Game[] = data.map(parseLine)
const sumOfPowers = games.reduce((sum, game) => sum + game.power, 0)

console.log(sumOfPowers)
