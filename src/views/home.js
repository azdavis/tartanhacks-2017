const title = document.getElementById("title")
const msg = document.getElementById("msg")
const msg2 = document.getElementById("msg2")
const form = document.getElementById("form")
const input = document.getElementById("input")

function one() {
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
        const factors = input.value.split(",").map(x => x.trim())
        if (factors.length > 10) {
            msg2.innerHTML = "that's too many factors."
            return
        }
        if (factors.find(x => x === "") !== undefined) {
            msg2.innerHTML = "you can't have an empty factor."
            return
        }
        form.remove()
        three(factors)
    }
}

function three(factors) {
    msg.innerHTML = "what the heck"
    console.log(factors)
}

title.innerHTML = "machine learning™"
msg.innerHTML = "what is your question for today?"
msg2.innerHTML = "it should be a yes/no question."
input.focus()
form.style.display = "block"
one()
