import * as fs from "fs"

const readFileIntoDataArray = (filepath: string) => {
    const data = fs.readFileSync("./src/" + filepath, "utf8")
    return data.split("\r\n")
}

export default readFileIntoDataArray
