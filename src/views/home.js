"use strict"

const title = document.getElementById("title")
const msg = document.getElementById("msg")
const msg2 = document.getElementById("msg2")
const form = document.getElementById("form")
const input = document.getElementById("input")

const onePrep = e => {
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

const isGreen = x => x.className === "green"
const addRow = n => isCalculated => () => {
    const row = document.createElement("div")
    for (let i = 0; i < n; i++) {
        const el = document.createElement("span")
        row.appendChild(el)
        if (isCalculated && i === n - 1) {
            el.className = "gray"
            el.textContent = "?"
            continue
        }
        el.className = "green"
        el.textContent = "y"
        el.onclick = () => {
            const ig = isGreen(el)
            el.className = ig ? "red" : "green"
            el.textContent = ig ? "n" : "y"
        }
    }
    form.insertBefore(row, form.lastChild)
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

    const footer = document.createElement("div")

    const addRowBtn = document.createElement("span")
    addRowBtn.innerHTML = "add datapoint"
    addRowBtn.className = "gray"
    const thisAddRow = addRow(factors.length + 1)
    addRowBtn.onclick = thisAddRow(false)

    const submitBtn = document.createElement("span")
    submitBtn.innerHTML = "submit data"
    submitBtn.className = "yellow"
    submitBtn.onclick = threePrep(thisAddRow, addRowBtn, submitBtn)

    footer.appendChild(addRowBtn)
    footer.appendChild(submitBtn)
    form.appendChild(footer)
}

const toData = x => isGreen(x) ? 1 : 0
const threePrep = (thisAddRow, addRowBtn, submitBtn) => e => {
    e.preventDefault()
    // a gross hack
    // it would be better to use one of those fancy front-end libraries with
    // two-way binding and whatnot
    const fc = form.children
    const max = fc.length - 1
    const data = []
    const results = []
    // skip the header and footer
    for (let i = 1; i < max; i++) {
        fc[i].className = "grayed"
        const elems = fc[i].children
        const max = elems.length - 1
        const ary = []
        for (let j = 0; j < max; j++) {
            elems[j].onclick = null
            ary.push(toData(elems[j]))
        }
        elems[max].onclick = null
        data.push(ary)
        results.push(toData(elems[max]))
    }
    three(fetch("/train", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({d: data, r: results})
    }).then(x => x.json()), thisAddRow, addRowBtn, submitBtn)
}

const three = (trained, thisAddRow, addRowBtn, submitBtn) => {
    submitBtn.textContent = "calculate"
    addRowBtn.onclick = thisAddRow(true)
}

title.textContent = "machine learning™"
msg.textContent = "what is your question for today?"
msg2.textContent = "it should be a yes/no question."
input.focus()
form.onsubmit = onePrep
form.style.display = "block"
