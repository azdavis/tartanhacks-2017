"use strict"

const math = require("mathjs")
const sigmoid = require("./sigmoid")
const deriv = require("./deriv")
const multiplyElements = require("./multiply-elements")

// must be vertical matrix
function getAveError(m1) {
    let sum = 0
    m1 = math.transpose(m1)
    let len = (m1.size())[1]

    for (let i = 0; i < len; i++) {
        sum += math.abs(m1.subset(math.index(0,i)))
    }
    return math.abs(sum / len)
}
// Input Data
const x = math.matrix([ [0,0,1,1],
                        [0,1,1,0],
                        [1,0,0,1],
                        [1,1,0,0],
                        [0,0,0,0],
                        [0,1,0,1],
                        [1,0,1,0],
                        [1,1,1,1]
])

// Output Data
const y = math.transpose(math.matrix([[0, 0, 0, 1, 0, 0, 0, 1]]))

const layer0 = x
let layer1
let layer1_error
let layer1_delta
let layer2
let layer2_error
let layer2_delta
let hiddenLayerSize
let error
let minError = 100
let synapse0
let synapse1
let minSynapse0
let minSynapse1

const hlSizes = [(x.size())[1], (x.size())[1] - 1, (x.size())[1] + 1]
const alphas = [0.1, 1, 10]
// const hlSizes = [4]
// const alphas = [1]
const dropout_percent = 0.2

let count = 1

for (let alphaIndex = 0; alphaIndex < 3; alphaIndex++) {

    // Iterate over 3 hidden layer sizes to get the best one
    for (let hlSizeIndex = 0; hlSizeIndex < 3; hlSizeIndex++) {

        // Weights
        hiddenLayerSize = hlSizes[hlSizeIndex]
        synapse0 = math.random([x.size()[1], hiddenLayerSize], -1, 1)
        synapse1 = math.random([hiddenLayerSize, 1], -1, 1)

        for (let i = 0; i < 40000; i++) {
            // forward propagation
            layer1 = math.multiply(layer0, synapse0).map(sigmoid)
            // dropout
            for (let a = 0; a < layer1.length; a++) {
                for (let b = 0; b < layer1[0].length; b++) {
                    let rand = math.random();
                    if (rand < dropout_percent) {
                        layer1[a][b] = 0
                    }
                    layer1[a][b] *= 1.0/(1-dropout_percent);
                }
            }
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
            if(i % 10000 == 0) {
                if (i == 0) {
                    console.log(count)
                    count++
                }
                else
                    console.log(i)
            }
        }
        let currentError = getAveError(layer2_error)
        if (currentError < minError) {
            minError = currentError
            minSynapse1 = synapse1
            minSynapse0 = synapse0
            console.log(minError)
        }
    }
}

console.log("Min Error")
console.log(minError)

console.log("Output of training data after training")
let test = math.multiply(x, minSynapse0).map(sigmoid)
console.log(math.multiply(test, minSynapse1).map(sigmoid))

// Test Cases for function
let testX = math.matrix([[0, 1, 1, 1]])
console.log("Output of [0, 1, 1, 1]")
let testl1 = math.multiply(testX, minSynapse0).map(sigmoid)
console.log(math.multiply(testl1, minSynapse1).map(sigmoid))

testX = math.matrix([[0, 0, 1, 1]])
console.log("Output of [0, 0, 1, 1]")
testl1 = math.multiply(testX, minSynapse0).map(sigmoid)
console.log(math.multiply(testl1, minSynapse1).map(sigmoid))

testX = math.matrix([[1, 0, 1, 1]])
console.log("Output of [1, 0, 1, 1]")
testl1 = math.multiply(testX, minSynapse0).map(sigmoid)
console.log(math.multiply(testl1, minSynapse1).map(sigmoid))

testX = math.matrix([[1, 1, 1, 1]])
console.log("Output of [1, 1, 1, 1]")
testl1 = math.multiply(testX, minSynapse0).map(sigmoid)
console.log(math.multiply(testl1, minSynapse1).map(sigmoid))

// console.log("Final Synapse0")
// console.log(minSynapse0)
// console.log("Final Synapse1")
// console.log(minSynapse1)
