"use strict"

// both arrays must be of the same length
function multiplyElements(arr1, arr2) {
    arr1.forEach(index => {
        arr1[index] *= arr2[index]
    })
    return arr1
}

module.exports = multiplyElements
