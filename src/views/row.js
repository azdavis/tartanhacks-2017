"use strict"

function row(f, xs) {
    const row = document.createElement("div")
    for (const x of xs) {
        row.appendChild(f(x))
    }
    return row
}

module.exports = row
