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
let syn1 = math.random([3,1], -1, 1)

const l0 = x
let l1
let l1_error
let l1_delta
let l2
let l2_error
let l2_delta

for (let i = 0; i < 60000; i++) {
    // forward propagation
    l1 = sigmoid(math.multiply(l0, syn0))
    l2 = sigmoid(math.multiply(l0, syn0))

    // how much did we miss?
    l2_error = math.subtract(y, l2)
    // multiply how much we missed by the
    // slope of the sigmoid at the values in l1
    l2_delta = math.multiply(l2_error, deriv(l2)) // multiply every element

    l1_error = math.multiply(l2_delta, math.transpose(syn1))

    l1_delta = math.multiply(l1_error, deriv(l1)) // multiply every element
    // update weights
    syn1 = math.add(math.multiply(math.transpose(l0),l2_delta), syn1)
    syn0 = math.add(math.multiply(math.transpose(l0),l1_delta), syn0)

}

console.log(l1)
