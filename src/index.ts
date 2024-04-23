import http from "http"
import path from "path"
import express from "express"
import { Server } from "socket.io"
import { config as dotenv } from "dotenv"

dotenv()

const app = express()
const server = http.createServer(app)
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server)

app.use("/client", express.static(path.resolve("dist/client")))

app.get("/", (req, res) => {
    res.sendFile(path.resolve("dist/client/index.html"))
})

io.on("connection", (socket) => {
    console.log("a user connected")

    socket.on("hello", () => {
        console.log("hello")
    })

    socket.on("disconnect", () => {
        console.log("a user disconnected")
    })
})

server.listen(process.env.PORT, () => {
    console.log(`listening on *:${process.env.PORT}`)
})