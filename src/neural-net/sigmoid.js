"use strict"

const math = require("mathjs")

const sigmoid = x => 1 / (1 + math.pow(math.e, -x))

module.exports = sigmoid
