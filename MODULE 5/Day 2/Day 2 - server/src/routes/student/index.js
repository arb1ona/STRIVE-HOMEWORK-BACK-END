// in this file I want to read and return a list of students
const express = require("express")
const fs = require("fs")
const studentRouter = express.Router()


studentRouter.get("/", (req, res) => {
    console.log(__dirname)
    const studentBuffer = fs.readFileSync("students.json")

    const studentString = studentBuffer.toString()
    const students = JSON.parse(studentString)
    res.send(students)
})




studentRouter.post("/", (req, res) => {
    res.send("POST")
})

studentRouter.put("/", (req, res) => {
    res.send("PUT")
})

studentRouter.delete("/", (req, res) => {
    res.send("DELETE")
})










module.exports = studentRouter;