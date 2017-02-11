"use strict"

const math = require("mathjs")

// Math functions for nonlinearity
function sigmoid(value) {
    return 1/(1+math.pow(math.e, -value))
}

// derivative of sigmoid
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

// must be vertical matrix
function getAveError(m1) {
    let sum = 0
    m1 = math.transpose(m1)
    let len = (m1.size())[1]
    for (let i = 0; i < len; i++) {
        sum += m1[0][i]
    }
    return sum / len
}
// TODO: make a function that sets x and y

// Input Data
const x = math.matrix([[0, 0, 1],
                     [0, 1, 1],
                     [1, 0, 1],
                     [1, 1, 1]])

// Output Data
const y = math.transpose(math.matrix([[0, 0, 1, 1]]))


const layer0 = x
let layer1
let layer1_error
let layer1_delta
let layer2
let layer2_error
let layer2_delta
let synapse0
let syanpse1
let hiddenLayerSize
let error

const hlSizes = [(x.size())[1], (x.size())[1] - 1, (x.size())[1] + 1]

for (hlSizeIndex = 0; hlSizeIndex < 3; hlSizeIndex++) {

    // Weights
    hiddenLayerSize = hlSizes[hlSizeIndex]
    synapse0 = math.random([3, hiddenLayerSize], -1, 1)
    synapse1 = math.random([hiddenLayerSize, 1], -1, 1)

    for (let i = 0; i < 60000; i++) {
        // forward propagation
        layer1 = math.multiply(layer0, synapse0).map(sigmoid)
        layer2 = math.multiply(layer1, synapse1).map(sigmoid)
        // compare estimate with actual output
        layer2_error = math.subtract(y, layer2)
        // use slope of sigmoid to update values
        layer2_delta = multiplyElements(layer2_error, layer2.map(deriv))
        // distribute error over synapse 1
        layer1_error = math.multiply(layer2_delta, math.transpose(synapse1))
        // use slope of sigmoid to update values
        layer1_delta = multiplyElements(layer1_error, layer1.map(deriv))
        // compare estimate with actual output
        // update weights
        synapse0 = math.add(synapse0, math.multiply(math.transpose(layer0), layer1_delta))
        synapse1 = math.add(synapse1, math.multiply(math.transpose(layer1), layer2_delta))
    }
    getAveError(layer2_error)
    //print ("Error:" + str(np.mean(np.abs(l2_error))))
}
console.log("Output of training data after training")
console.log(layer2)

// Test Cases for function
let testX = math.matrix([[0, 1, 0]])
console.log("Output of [0,1,0]")
let testl1 = math.multiply(testX, synapse0).map(sigmoid)
console.log(math.multiply(testl1, synapse1).map(sigmoid))

testX = math.matrix([[1, 1, 0]])
console.log("Output of [1,1,0]")
testl1 = math.multiply(testX, synapse0).map(sigmoid)
console.log(math.multiply(testl1, synapse1).map(sigmoid))
