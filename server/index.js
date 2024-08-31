const express = require('express');
const server = express();
require("dotenv").config();
const Port = process.env.Port;
const connection = require("./Config/connection.db")
const libraryRouter = require("./Routes/library.route")
const userRouter = require("./Routes/user.route")


server.use(express.json())
server.use("/library",libraryRouter)
server.use("/user",userRouter)


server.get("/",(req,res)=>{
    res.send("Welcome to Home Page")
})
server.listen(Port,async()=>{
    await connection
    console.log(`Server is running on the Port ${Port} and connected to the database`)
})