const title = document.getElementById("title")
const msg = document.getElementById("msg")
const form = document.getElementById("form")

function one() {
    title.innerHTML = "machine learning™"
    msg.innerHTML = "what is your question for today?"

    const input = document.createElement("input")
    form.appendChild(input)
    form.onsubmit = e => {
        e.preventDefault()
        input.remove()
        two()
    }
    input.focus()
}

function two() {
    title.innerHTML = "what up"
    msg.innerHTML = "hey"
}

one()
