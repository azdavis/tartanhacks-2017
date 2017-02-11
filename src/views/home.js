"use strict"

const title = document.getElementById("title")
const msg = document.getElementById("msg")
const msg2 = document.getElementById("msg2")
const form = document.getElementById("form")
const input = document.getElementById("input")

const one = e => {
    e.preventDefault()
    msg.textContent = "what are some factors that affect that question?"
    msg2.textContent = "separate them with commas (',')."
    input.value = ""
    form.onsubmit = two
}

const two = e => {
    e.preventDefault()
    const factors = input.value.split(",").map(x => x.trim())
    if (factors.find(x => x === "") !== undefined) {
        msg2.textContent = "you can't have an empty factor."
        return
    }
    if (factors.length > 10) {
        msg2.textContent = "you can't have more than 10 factors."
        return
    }
    form.remove()
}

title.textContent = "machine learning™"
msg.textContent = "what is your question for today?"
msg2.textContent = "it should be a yes/no question."
input.focus()
form.onsubmit = one
form.style.display = "block"
