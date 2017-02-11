"use strict"

function row(n) {
    const row = document.createElement("div")
    for (let i = 0; i < n; i++) {
        const elem = document.createElement("span")
        row.appendChild(elem)
    }
    return row
}

module.exports = row
