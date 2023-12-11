import readFileIntoDataArray from "../readFileIntoDataArray"

const convertNamesToDigits = (value: string): string => {
    const digitNamesToNumbers: Record<string, number> = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
    }

    let newValue = value
    for (let digitName in digitNamesToNumbers) {
        const regex = new RegExp(digitName, "g")
        newValue = newValue.replace(
            regex,
            digitName + digitNamesToNumbers[digitName].toString() + digitName,
        )
    }

    return newValue
}

const combineFirstAndLastDigits = (value: string): number => {
    const cleanValue = value.replace(/\D/g, "")
    const firstDigit = cleanValue.slice(0, 1)
    const lastDigit = cleanValue.slice(-1)
    const result = +`${firstDigit}${lastDigit}`
    return result
}

// Read values from Input.txt
const data = readFileIntoDataArray("./Day 1/Input.txt")
const preprocessedData = data.map(convertNamesToDigits)
const twoDigitsArray = preprocessedData.map(combineFirstAndLastDigits)

// Sum all values inside numberArray
const sum = twoDigitsArray.reduce((a, b) => a + b, 0)

for (let i = 0; i < twoDigitsArray.length; i++) {
    console.log(data[i], preprocessedData[i], twoDigitsArray[i])
}

console.log(sum)
