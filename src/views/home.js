const title = document.getElementById("title")
const msg = document.getElementById("msg")
const msg2 = document.getElementById("msg2")
const form = document.getElementById("form")
const input = document.getElementById("input")

const one = e => {
    e.preventDefault()
    msg.innerHTML = "what are some factors that affect that question?"
    msg2.innerHTML = "separate them with commas (',')."
    input.value = ""
    form.onsubmit = two
}

const two = e => {
    e.preventDefault()
    const factors = input.value.split(",").map(x => x.trim())
    if (factors.find(x => x === "") !== undefined) {
        msg2.innerHTML = "you can't have an empty factor."
        return
    }
    if (factors.length > 10) {
        msg2.innerHTML = "you can't have more than 10 factors."
        return
    }
    form.remove()
}

title.innerHTML = "machine learning™"
msg.innerHTML = "what is your question for today?"
msg2.innerHTML = "it should be a yes/no question."
input.focus()
form.style.display = "block"
form.onsubmit = one
