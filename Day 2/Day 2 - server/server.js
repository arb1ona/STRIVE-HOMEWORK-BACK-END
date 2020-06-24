const express = require("express") // will make express available for use

const app = express() // new instance of express
app.use(express.json())
const studentRouter = require("./src/routes/student")

app.use("/students", studentRouter)
app.listen(4000, () => console.log("Hey, the server is running on the port 4000"))


