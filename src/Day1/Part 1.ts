import readFileIntoDataArray from "../readFileIntoDataArray"

const combineFirstAndLastDigits = (value: string): number => {
    const cleanValue = value.replace(/\D/g, "")
    const firstDigit = cleanValue.slice(0, 1)
    const lastDigit = cleanValue.slice(-1)
    const result = +`${firstDigit}${lastDigit}`
    return result
}

// Read values from Input.txt
const data = readFileIntoDataArray("./Day 1/Input.txt")
const numberArray = data.map(combineFirstAndLastDigits)

// Sum all values inside numberArray
const sum = numberArray.reduce((a, b) => a + b, 0)

console.log(sum)
