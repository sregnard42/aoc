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

const countCache = new Map<number, number>()
const countWinningNumbers = (cards: Card[], i: number): number => {
    if (cards[i] === undefined) {
        return 1
    }

    // Check the cache to avoid re-counting
    let count = countCache.get(i)
    if (count !== undefined) {
        return count
    }

    // Count the number of winning numbers of this card
    const { winningNumbers, numbers } = cards[i]
    count = numbers.filter((number) => winningNumbers.includes(number)).length

    // Count the number of winning numbers that spawned from this card
    let subcount = 0
    for (let j = 1; j <= count; j++) {
        subcount += countWinningNumbers(cards, i + j)
    }

    // Cache and return the result
    count += subcount
    countCache.set(i, count)
    return count
}

const main = () => {
    const data = readFileIntoDataArray("./Day4/Input.txt")
    const cards = data.map(parseLine)
    let count = cards.length
    for (let i = 0; i < cards.length; i++) {
        count += countWinningNumbers(cards, i)
    }
    console.log(count)
}

if (require.main === module) {
    const startTime = performance.now()
    main()
    console.log(performance.now() - startTime)
}
