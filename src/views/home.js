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
    msg.innerHTML = "hey"
}

title.innerHTML = "machine learning™"
input.focus()

one()
