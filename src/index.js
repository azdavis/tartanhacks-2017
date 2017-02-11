"use strict"

const express = require("express")
const bodyParser = require("body-parser")
const neuralNet = require("./neural-net")

const app = express()
app.set("view engine", "pug")
app.set("views", "./src/views")
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/tutorial", (req, res) => {
    res.render("tutorial")
})

app.post("/train", (req, res) => {
    const {d, r} = req.body
    const {synapse0, synapse1} = neuralNet.train(d, r)
    res.send({s0: synapse0._data, s1: synapse1._data})
})

app.post("/get", (req, res) => {
    const {d, s0, s1} = req.body
    res.send({r: neuralNet.get(d, s0, s1)._data[0]})
})

app.use((req, res) => {
    res.status(404).render("error", {message: "HTTP 404 Not Found"})
})

app.listen(process.env.PORT || 3000)
