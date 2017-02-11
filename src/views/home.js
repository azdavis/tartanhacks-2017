"use strict"

const row = require("./row")

const title = document.getElementById("title")
const msg = document.getElementById("msg")
const msg2 = document.getElementById("msg2")
const form = document.getElementById("form")
const input = document.getElementById("input")

const onePrep = () => e => {
    e.preventDefault()
    if (input.value.trim() === "") {
        msg2.textContent = "that can't be empty."
        return
    }
    one(input.value)
}

const one = question => {
    input.value = ""
    msg.textContent = `what are some factors that affect '${question}'?`
    msg2.textContent = "they should also be yes/no, and separated with commas."
    form.onsubmit = twoPrep(question)
}

const twoPrep = question => e => {
    e.preventDefault()
    if (input.value.trim() === "") {
        msg2.textContent = "that can't be empty."
        return
    }
    const factors = input.value.split(",").map(x => x.trim())
    if (factors.find(x => x === "") !== undefined) {
        msg2.textContent = "you can't have an empty factor."
        return
    }
    if (factors.length > 7) {
        msg2.textContent = "you can't have more than 7 factors."
        return
    }
    two(question, factors)
}

const two = (question, factors) => {
    input.remove()
    const header = row(factors.length + 1)
    let i
    for (i = 0; i < factors.length; i++) {
        header.children[i].textContent = factors[i]
    }
    header.children[i].textContent = question
    form.appendChild(header)
}

title.textContent = "machine learning™"
msg.textContent = "what is your question for today?"
msg2.textContent = "it should be a yes/no question."
input.focus()
form.onsubmit = onePrep()
form.style.display = "block"
