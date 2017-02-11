const math = require('mathjs')

// Math functions for nonlinearity
function sigmoid(value) {
    return 1/(1+math.pow(math.e, -value))
}

function deriv(y) {
    return y * (1-y)
}

// Input Data
const x = math.matrix([[0, 0, 1],
                     [0, 1, 1],
                     [1, 0, 1],
                     [1, 1, 1]])

// Output Data
const y = math.transpose(math.matrix([[0, 0, 1, 1]]))

// Weights
let syn0 = math.random([3,1], -1, 1)

const l0 = x
let l1
let l1_error
let l1_delta

for (let i = 0; i < 60000; i++) {
    // forward propagation
    l1 = sigmoid(math.multiply(l0, syn0))
    // how much did we miss?
    l1_error = math.subtract(y, l1)
    // multiply how much we missed by the
    // slope of the sibgmoid at the values in l1
    l1_delta = math.multiply(l1_error, deriv(l1))
    // update weights
    syn0 = math.add(math.multiply(math.transpose(l0),l1_delta))
}

console.log(l1)
