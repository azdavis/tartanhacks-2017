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
// TODO: make a function that sets x and y

// Input Data
function train(inputData, inputResults) {
    const x = math.matrix(inputData)
    const y = math.transpose(math.matrix([inputResults]))

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

    // Gradient descent and dropout optimization variables
    const hlSizes = [(x.size())[1], (x.size())[1] - 1, (x.size())[1] + 1]
    const alphas = [0.1, 1, 10]
    const dropout_percent = 0.2

    for (let alphaIndex = 0; alphaIndex < 3; alphaIndex++) {

        // Iterate over 3 hidden layer sizes to get the best one
        for (let hlSizeIndex = 0; hlSizeIndex < 3; hlSizeIndex++) {

            // Weights
            hiddenLayerSize = hlSizes[hlSizeIndex]
            synapse0 = math.random([(x.size())[1], hiddenLayerSize], -1, 1)
            synapse1 = math.random([hiddenLayerSize, 1], -1, 1)

            for (let i = 0; i < 40000; i++) {
                // forward propagation
                layer1 = math.multiply(layer0, synapse0).map(sigmoid)
                // dropout
                layer1.forEach(index => {
                    let rand = math.random()
                    if (rand < dropout_percent) {
                        layer1[index] = 0
                    }
                    layer1[index] *= 1.0/(1-dropout_percent)
                })
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
            let currentError = getAveError(layer2_error)
            if (currentError < minError) {
                minError = currentError
                minSynapse1 = synapse1
                minSynapse0 = synapse0
            }
        }
    }
    return {
        synapse0: minSynapse0,
        synapse1: minSynapse1
    }
}

function get(input, w0, w1) {
    let synapse0 = math.matrix(w0)
    let synapse1 = math.matrix(w1)
    let x = math.matrix(input)
    let testl1 = math.multiply(x, synapse0).map(sigmoid)
    return math.multiply(testl1, synapse1).map(sigmoid)
}

module.exports = {train, get}
