import readFileIntoDataArray from "../readFileIntoDataArray"

const parseData = (data: string[]): [number[], number[][][]] => {
    const seeds = data[0].split(": ")[1].split(" ").map(Number)
    const mappings: number[][][] = []
    let i = 1
    while (++i < data.length) {
        mappings.push([])
        while (++i < data.length && data[i].length > 0) {
            const values = data[i].split(" ").map(Number)
            mappings[mappings.length - 1].push(values)
        }
    }
    return [seeds, mappings]
}

const findMappedValue = (
    value: number,
    mapping: number[][][],
    i = 0,
): number => {
    if (i >= mapping.length) {
        return value
    }
    let j = 0
    while (j < mapping[i].length) {
        const [destination, source, range] = mapping[i][j]
        const delta = value - source
        if (delta >= 0 && delta <= range) {
            return findMappedValue(destination + delta, mapping, i + 1)
        }
        j++
    }
    return findMappedValue(value, mapping, i + 1)
}

const main = () => {
    const rawData = readFileIntoDataArray("./Day5/Input.txt")
    const [seeds, mappings] = parseData(rawData)
    const lowestLocation = seeds
        .map((seed) => findMappedValue(seed, mappings))
        .reduce((a, b) => Math.min(a, b))
    console.log(lowestLocation)
}

if (require.main === module) {
    main()
}
