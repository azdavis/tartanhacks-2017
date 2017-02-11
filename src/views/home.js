"use strict"

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

const newRow = n => {
    const row = document.createElement("div")
    for (let i = 0; i < n; i++) {
        const el = document.createElement("span")
        el.className = "green"
        el.textContent = "y"
        el.onclick = () => {
            if (el.className === "green") {
                el.className = "red"
                el.textContent = "n"
            } else {
                el.className = "green"
                el.textContent = "y"
            }
        }
        row.appendChild(el)
    }
    return row
}

const two = (question, factors) => {
    input.remove()
    msg.textContent = "enter some data."
    msg2.textContent = "click to add rows and switch between yes/no."
    const header = document.createElement("div")
    let el
    for (const x of factors) {
        el = document.createElement("span")
        el.textContent = x
        el.className = "blue"
        header.appendChild(el)
    }
    el = document.createElement("span")
    el.textContent = question
    el.className = "cyan"
    header.appendChild(el)
    form.appendChild(header)
    const addRowBtn = document.createElement("div")
    addRowBtn.className = "gray"
    addRowBtn.innerHTML = "<span>add datapoint</span>"
    addRowBtn.onclick = () => {
        form.insertBefore(newRow(factors.length + 1), addRowBtn)
    }
    form.appendChild(addRowBtn)
}

title.textContent = "machine learning™"
msg.textContent = "what is your question for today?"
msg2.textContent = "it should be a yes/no question."
input.focus()
form.onsubmit = onePrep()
form.style.display = "block"
