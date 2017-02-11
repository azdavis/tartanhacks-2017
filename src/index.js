"use strict"

const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.set("view engine", "pug")
app.set("views", "./src/views")
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.render("home")
})

app.use((req, res) => {
    res.status(404).render("error", {message: "HTTP 404 Not Found"})
})

app.listen(3000)
