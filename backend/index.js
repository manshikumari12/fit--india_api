const express = require("express")
const app= express()
const passport=require("passport")
const {connection}= require("./db")
const {Userroute}=require("./route/user.route")
require("./google.oauth")
require("dotenv").config()
app.use(express.json())

app.use("/",Userroute)

app.get("/",(req,res)=>{
    res.send("home page")
  })

  app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

app.get("/auth/protected",(req,res)=>{
    res.send("hello there!")
})

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db")

    }catch(err){
        console.log(err)
    }
    console.log(`server is running at port ${process.env.port} `)
})