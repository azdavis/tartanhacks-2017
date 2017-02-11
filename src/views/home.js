const title = document.getElementById("title")
const msg = document.getElementById("msg")
const form = document.getElementById("form")
const input = document.getElementById("input")

function one() {
    title.innerHTML = "machine learning™"
    msg.innerHTML = "what is your question for today?"
    form.onsubmit = e => {
        e.preventDefault()
        input.value = ""
        two()
    }
}

function two() {
    title.innerHTML = "what up"
    msg.innerHTML = "hey"
}

input.focus()

one()
