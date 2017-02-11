"use strict"

const title = document.getElementById("title")
const msg = document.getElementById("msg")
const msg2 = document.getElementById("msg2")
const form = document.getElementById("form")
const input = document.getElementById("input")

let question = ""
let factors = []

function row(n) {
    const row = document.createElement("div")
    for (let i = 0; i < n; i++) {
        const elem = document.createElement("span")
        row.appendChild(elem)
    }
    return row
}

const one = e => {
    e.preventDefault()
    msg.textContent = "what are some factors that affect that question?"
    msg2.textContent = "separate them with commas (',')."
    question = input.value
    input.value = ""
    form.onsubmit = two
}

const two = e => {
    e.preventDefault()
    factors = input.value.split(",").map(x => x.trim())
    if (factors.find(x => x === "") !== undefined) {
        msg2.textContent = "you can't have an empty factor."
        return
    }
    if (factors.length > 7) {
        msg2.textContent = "you can't have more than 7 factors."
        return
    }
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
form.onsubmit = one
form.style.display = "block"
