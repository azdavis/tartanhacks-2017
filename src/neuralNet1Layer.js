"use strict"

const math = require("mathjs")

// Math functions for nonlinearity
function sigmoid(val) {
    return 1/(1+math.pow(math.e, -val))
}

// derivative of sigmoid
function deriv(val) {
    return val * (1-val)
}

// both arrays must be of the same length
function multiplyElements(arr1, arr2) {
    arr1.forEach(function(index) {
        arr1[index] = arr1[index] * arr2[index]
    })
    return arr1
}

// TODO: make a function that sets x and y

// Input Data
const x = math.matrix([[0, 0, 1],
                     [0, 1, 1],
                     [1, 0, 1],
                     [1, 1, 1]])

// Output Data
const y = math.transpose(math.matrix([[0, 0, 1, 1]]))

// Weights
let synapse0 = math.random([3,1], -1, 1)

const layer0 = x
let layer1
let layer1_error
let layer1_delta

for (let i = 0; i < 60000; i++) {
    // forward propagation
    layer1 = math.multiply(layer0, synapse0).map(sigmoid)
    // compare estimate with actual output
    layer1_error = math.subtract(y, layer1)
    // use slope of sigmoid to update values
    layer1_delta = multiplyElements(layer1_error, layer1.map(deriv))
    // update weights
    synapse0 = math.add(synapse0, math.multiply(math.transpose(layer0), layer1_delta))
}

// final estimates
console.log(layer1)
