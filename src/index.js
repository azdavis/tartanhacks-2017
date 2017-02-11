"use strict"

const express = require("express")
const bodyParser = require("body-parser")
const neuralNet = require("./neuralNet")

const app = express()
app.set("view engine", "pug")
app.set("views", "./src/views")
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.render("home")
})

app.post("/train", (req, res) => {
    const {d, r} = req.body
    // const {synapse0: s0, synapse1: s1} = neuralNet.train(d, r)
    res.send({s0: 1, s1: 2})
})

app.post("/get", (req, res) => {
    const {d, s0, s1} = req.body
    // res.send(neuralNet.get(d, s0, s1))
    res.send({r: 0.9})
})

app.use((req, res) => {
    res.status(404).render("error", {message: "HTTP 404 Not Found"})
})

app.listen(3000)
