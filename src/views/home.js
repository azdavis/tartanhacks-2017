const title = document.getElementById("title")
const msg = document.getElementById("msg")
const form = document.getElementById("form")
const input = document.getElementById("input")

function one() {
    msg.innerHTML = "what is your question for today?"
    form.onsubmit = e => {
        e.preventDefault()
        input.value = ""
        two()
    }
}

function two() {
    msg.innerHTML = "hey"
}

title.innerHTML = "machine learning™"
input.focus()

one()
