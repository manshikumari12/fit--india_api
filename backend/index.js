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
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
// const { passport } = require("./google.outh");
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


app.use("/",Userroute)

app.get("/",(req,res)=>{
    res.send("home page")
  })
  app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
//============================send-mail=====================================

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "guptamanshi606@gmail.com",
//       pass: "pecdubvwywqpctqk",
//     },
//   });
//   let loggerTouse = (req, res, next) => {
//     logger.log("info", `A ${req.method} request is made on url:${req.url}`);
//     if (req.method != "GET") {
//       let email = req.body.email || req.user.email || manshi;
  
//       let mailOptions = {
//         from: "guptamanshi606@gmail.com",
//         to:"manshisbp@gmail.com" ,
//         subject: "Email from fitindia",
//         text: "welcome to manshigupta from manshu sucessfully login"
//         // text: "info" + " " + `A ${req.method} request is made on url:${req.url}`,
//       };
//       transporter.sendMail(mailOptions,(error,info ) => {
//         if (error) {
//           console.log(error);
      
//         } else {
//           console.log("Email sent: "+info.response);
       
//         }
//       });
//     }
//     next();
//   };


//   app.use(loggerTouse);


//===================google==================================================================
  app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        failureRedirect: '/login', session: false }), 
        function (req, res) {
            res.redirect("http://localhost:1111/index.page")  
})




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