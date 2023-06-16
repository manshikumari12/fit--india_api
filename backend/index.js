const express = require("express")
const app= express()
const {connection}= require("./db")
const {Userroute}=require("./route/user.route")
require("dotenv").config()
app.use(express.json())

app.use("/",Userroute)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db")

    }catch(err){
        console.log(err)
    }
    console.log(`server is running at port ${process.env.port} `)
})