const express = require("express")
const app= express()
const passport=require("passport")
const {connection}= require("./db")
const {Userroute}=require("./route/user.route")
require("./google.oauth")
const {logger}=require("./auth/logger")
const nodemailer = require("nodemailer");
require("dotenv").config()
app.use(express.json())
// const fs = require("fs");
const cors = require("cors");
const { googleAuthentication } = require("./google.oauth")








//===================google==================================================================



app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session:false }), googleAuthentication )
// ***********************************************************************************
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db")

    }catch(err){
        console.log(err)
    }
    console.log(`server is running at port ${process.env.port} `)
})