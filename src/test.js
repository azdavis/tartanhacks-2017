const math = require("mathjs")

const arr = [[0, 0, 1],
             [0, 1, 1],
             [1, 0, 1],
             [1, 1, 1]]

const x = math.matrix(arr)

console.log(x)
console.log(JSON.stringify(x))
