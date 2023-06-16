const express = require("express")
const {UserModel}=require("../model/user.model")
const jwt = require("jsonwebtoken")
const {auth}=require("../auth/auth")
const {blackmodel}=require("../model/black.model")
const bcrypt = require("bcrypt")
const Userroute = express.Router()


Userroute.post("/signup",async (req,res)=>{
    const{ name, email, phone, password}=req.body

    const user =await UserModel.find({email})
    if(user.length<=0){
        try{
            bcrypt.hash(password,6,async(err,hash)=>{
                if(err){
                    res.send({msg:"somthing went wrong"})
                }else{
                    const user = new UserModel({
                     name, 
                     email,
                     phone,
                      password:hash})

                      await user.save();
                      res.send({msg:"New user has been signup"})

                }
            })
        }catch(err){
            res.send({ msg: "Something went Wrong", error: error.message });  
        }
    }else{
            res.send({ msg: "User already exist, please login" });
        }
    
})


Userroute.post("/login", async(req,res)=>{
    const {email,password}=req.body
    try {

        const user = await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token =jwt.sign({userid:user[0]._id},process.env.jwtkey)
                    res.send({ msg: " user has been Logged in ", token: token });
                }
            })
        }else{
            res.send({ msg: "Wrong credentials" }); 
        }
        
    } catch (error) {
        res.send({ msg: "Something went wrong", error: error.message });
    }
})


Userroute.get("/logout",auth,async(req,res)=>{

    let token = req.headers.authorization?.split(" ")[1]
    if(token){
        try {
            let logout =new blackmodel({token})
            await logout.save()
            res.send("logout done")
            
        } catch (error) {
            res.send("wrong")
        }
    }else{
        res.send("login needed")
    }
  
    
    
    })


module.exports={Userroute}