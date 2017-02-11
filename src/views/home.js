const title = document.getElementById("title")
const msg = document.getElementById("msg")
const msg2 = document.getElementById("msg2")
const form = document.getElementById("form")
const input = document.getElementById("input")

function one() {
    msg.innerHTML = "what is your question for today?"
    msg2.innerHTML = "it should be a yes/no question."
    form.onsubmit = e => {
        e.preventDefault()
        input.value = ""
        two()
    }
}

function two() {
    msg.innerHTML = "what are some factors that affect that question?"
    msg2.innerHTML = "separate them with commas (',')."
    form.onsubmit = e => {
        e.preventDefault()
        three(input.value)
        form.remove()
    }
}

function three(factors) {
    factors = factors.split(",").map(x => x.trim())
    msg.innerHTML = "what the heck"
}

title.innerHTML = "machine learning™"
form.style.display = "block"
input.focus()

one()
