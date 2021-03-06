"use strict"

const title = document.getElementById("title")
const msg = document.getElementById("msg")
const msg2 = document.getElementById("msg2")
const form = document.getElementById("form")
const input = document.getElementById("input")

const onePrep = e => {
    e.preventDefault()
    if (input.value.trim() === "") {
        msg2.textContent = "That can't be empty."
        return
    }
    one(input.value)
}

const one = question => {
    input.value = ""
    msg.textContent = `What are some factors that affect '${question}'?`
    msg2.textContent = "They should also be yes/no, and separated with commas."
    form.onsubmit = twoPrep(question)
}

const twoPrep = question => e => {
    e.preventDefault()
    if (input.value.trim() === "") {
        msg2.textContent = "That can't be empty."
        return
    }
    const factors = input.value.split(",").map(x => x.trim())
    if (factors.find(x => x === "") !== undefined) {
        msg2.textContent = "You can't have an empty factor."
        return
    }
    if (factors.length < 2) {
        msg2.textContent = "You can't have less than 2 factors."
        return
    }
    if (factors.length > 7) {
        msg2.textContent = "You can't have more than 7 factors."
        return
    }
    two(question, factors)
}

const isGreen = x => x.className === "green"
const addRow = n => isCalculated => () => {
    window.scrollTo(0, document.body.scrollHeight)
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
        el.textContent = "1"
        el.onclick = () => {
            const ig = isGreen(el)
            el.className = ig ? "red" : "green"
            el.textContent = ig ? "0" : "1"
        }
    }
    form.insertBefore(row, form.lastChild)
    return row
}

const two = (question, factors) => {
    input.remove()
    msg.textContent = "Enter some data."
    msg2.textContent = "Click to add rows and switch between yes/no."

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
    addRowBtn.textContent = "Add datapoint"
    addRowBtn.className = "magenta"
    const thisAddRow = addRow(factors.length + 1)
    addRowBtn.onclick = thisAddRow(false)

    const trainBtn = document.createElement("span")
    trainBtn.textContent = "Train"
    trainBtn.className = "yellow"
    trainBtn.onclick = threePrep(thisAddRow, addRowBtn, trainBtn)

    footer.appendChild(addRowBtn)
    footer.appendChild(trainBtn)
    form.appendChild(footer)
}

const toJsonOrError = x => x.ok ? x.json() : Promise.reject(x.statusText)
const toData = x => isGreen(x) ? 1 : 0
const threePrep = (thisAddRow, addRowBtn, trainBtn) => e => {
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
    }).then(toJsonOrError), thisAddRow, addRowBtn, trainBtn)
}

const three = (train, thisAddRow, addRowBtn, calcBtn) => {
    msg.textContent = "Now add some data for which you don't know the answer."
    msg2.textContent = "Use the calculate button to get the likely result."
    const pending = []
    calcBtn.textContent = "Calculate"
    calcBtn.onclick = () => {
        while (pending.length !== 0) {
            const p = pending.pop()
            p.className = "grayed"
            const data = []
            const elems = p.children
            const max = elems.length - 1
            for (let j = 0; j < max; j++) {
                elems[j].onclick = null
                data.push(toData(elems[j]))
            }
            p.lastChild.textContent = "..."
            train.then(({s0, s1}) =>
                fetch("/get", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({d: data, s0, s1})
                })
                .then(toJsonOrError)
                .then(({r}) => {
                    p.lastChild.className = r > 0.5 ? "green" : "red"
                    p.lastChild.textContent = r.toFixed(4)
                })
            ).catch(x => alert(`Error: ${x}`))
        }
    }
    thisAddRow = thisAddRow(true)
    addRowBtn.onclick = () => {
        pending.push(thisAddRow())
    }
}

title.textContent = "Stairwell"
msg.textContent = "What is your question for today?"
msg2.textContent = "It should be a yes/no question."
form.onsubmit = onePrep
form.style.display = "block"
input.focus()
