import readFileIntoDataArray from "../readFileIntoDataArray"

type Range = [number, number]
type Mapping = [Range, Range]

const parseSeeds = (data: string[]): Range[] => {
    const seeds: Range[] = []
    const rawSeeds = data[0].split(": ")[1].split(" ").map(Number)
    for (let i = 0; i < rawSeeds.length; i += 2) {
        const start = rawSeeds[i]
        const size = rawSeeds[i + 1]
        const end = start + size
        seeds.push([start, end])
    }
    return seeds
}

const parseData = (data: string[]): [Range[], Mapping[][]] => {
    const seeds = parseSeeds(data)
    const mappings: Mapping[][] = []
    let i = 1
    while (++i < data.length) {
        mappings.push([])
        while (++i < data.length && data[i].length > 0) {
            const values = data[i].split(" ").map(Number)
            const [destination, source, size] = values
            mappings[mappings.length - 1].push([
                [destination, destination + size],
                [source, source + size],
            ])
        }
    }
    return [seeds, mappings]
}

const findMappedRanges = (
    ranges: Range[],
    mapping: Mapping[][],
    i = 0,
): Range[] => {
    if (i >= mapping.length) {
        return ranges
    }

    const mappedRanges: Range[] = []

    for (const range of ranges) {
        for (const map of mapping[i]) {
            const [destination, source] = map

            // Fully mapped by source
            if (range[0] >= source[0] && range[1] <= source[1]) {
                mappedRanges.push([
                    destination[0] + (range[0] - source[0]),
                    destination[1] + (range[1] - source[1]),
                ])
            }

            // TODO: Handle partially mapped
        }
    }

    return findMappedRanges(
        mappedRanges.length > 0 ? mappedRanges : ranges,
        mapping,
        i + 1,
    )
}

const main = () => {
    const rawData = readFileIntoDataArray("./Day5/InputSmall2.txt")
    const [seeds, mappings] = parseData(rawData)
    console.log({ seeds })
    const ranges = findMappedRanges(seeds, mappings)
    console.log({ ranges })
    const lowestLocation = Math.min(...ranges.flat())
    console.log({ lowestLocation })
}

if (require.main === module) {
    main()
}
