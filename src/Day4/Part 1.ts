import readFileIntoDataArray from "../readFileIntoDataArray"

interface Card {
    winningNumbers: number[]
    numbers: number[]
}

const parseLine = (data: string): Card => {
    const [winningNumbers, numbers] = data
        .replace(/\s+/g, " ")
        .split(":")[1]
        .split("|")
        .map((s) => [...new Set(s.trim().split(" ").map(Number))])

    return { winningNumbers, numbers }
}

const countWinningNumbers = (card: Card) => {
    const { winningNumbers, numbers } = card
    return numbers.filter((number) => winningNumbers.includes(number)).length
}

const main = () => {
    const data = readFileIntoDataArray("./Day4/Input.txt")
    const sum = data
        .map((line) => {
            const card = parseLine(line)
            const count = countWinningNumbers(card)
            const points = Math.floor(Math.pow(2, count - 1))
            return points
        })
        .reduce((a, b) => a + b, 0)
    console.log(sum)
}

if (require.main === module) {
    main()
}
