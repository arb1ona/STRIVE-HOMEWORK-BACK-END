const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")

const router = express.Router()

const readFile = (fileName) => {
    const buffer = fs.readFileSync(path.join(__dirname, fileName))
    const fileContent = buffer.toString()
    return JSON.parse(fileContent)
}

router.get("/:id", (req, res) => {
    const moviesDB = readFile("movies.json")
    const newMovie = moviesDB.filter((movie) => movie.ID === req.params.id)
    res.send(newMovie)
})

router.get("/", (req, res) => {
    const moviesDB = readFile("movies.json")
    if (req.query && req.query.name) {
        const filteredMovies = moviesDB.filter(
            (movie) =>
                movie.hasOwnProperty("name") &&
                movie.name.toLowerCase() === req.query.name.toLowerCase()
        )
        res.send(filteredMovies)
    } else {
        res.send(moviesDB)
    }
})

router.post(
    "/",

    (req, res) => {
        const moviesDB = readFile("movies.json")
        const newMovie = {
            ...req.body,
            ID: uniqid(),
            createdAt: new Date(),
        }

        moviesDB.push(newMovie)

        fs.writeFileSync(
            path.join(__dirname, "movies.json"),
            JSON.stringify(moviesDB)
        )

        res.status(201).send(moviesDB)
    }
)

router.delete("/:id", (req, res) => {
    const moviesDB = readFile("movies.json")
    const newDb = moviesDB.filter((x) => x.ID !== req.params.id)
    fs.writeFileSync(path.join(__dirname, "movies.json"), JSON.stringify(newDb))

    res.send(newDb)
})

router.put("/:id", (req, res) => {
    const moviesDB = readFile("movies.json")
    const newDb = moviesDB.filter((x) => x.ID !== req.params.id) //removing previous item
    const movies = req.body
    movies.ID = req.params.id
    newDb.push(movies) //adding new item
    fs.writeFileSync(path.join(__dirname, "movies.json"), JSON.stringify(newDb))

    res.send(newDb)
})

module.exports = router