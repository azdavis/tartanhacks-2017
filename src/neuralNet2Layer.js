const math = require('mathjs')

// Math functions for nonlinearity
function sigmoid(value) {
    return 1/(1+math.pow(math.e, -value))
}

function deriv(y) {
    return y * (1-y)
}

// both arrays must be of the same length
function multiplyElements(arr1, arr2) {
    arr1.forEach(function(index) {
        arr1[index] = arr1[index] * arr2[index];
    })
    return arr1
}

// Input Data
const x = math.matrix([[0, 0, 1],
                     [0, 1, 1],
                     [1, 0, 1],
                     [1, 1, 1]])

// Output Data
const y = math.transpose(math.matrix([[0, 0, 1, 1]]))

// Weights
let syn0 = math.random([3,4], -1, 1)
let syn1 = math.random([4,1], -1, 1)

const l0 = x
let l1
let l1_error
let l1_delta
let l2
let l2_error
let l2_delta

for (let i = 0; i < 60000; i++) {
    // forward propagation
    l1 = math.multiply(l0, syn0).map(sigmoid)
    l2 = math.multiply(l1, syn1).map(sigmoid)

    // how much did we miss?
    l2_error = math.subtract(y, l2)
    // multiply how much we missed by the
    // slope of the sigmoid at the values in l1
    l2_delta = multiplyElements(l2_error, l2.map(deriv))

    l1_error = math.multiply(l2_delta, math.transpose(syn1))

    l1_delta = multiplyElements(l1_error, l1.map(deriv))
    // update weights
    let t0 = math.transpose(l0)
    let m0 = math.multiply(t0, l1_delta)
    syn0 = math.add(syn0, m0)

    let t1 = math.transpose(l1)
    let m1 = math.multiply(t1, l2_delta)
    syn1 = math.add(syn1, m1)
}

console.log(l2)
