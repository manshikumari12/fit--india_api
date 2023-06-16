const jwt =require("jsonwebtoken")
require("dotenv").config()
const {blackmodel}=require("../model/black.model")


const auth =async(req,res,next)=>{
    const token = req.headers?.authorization?.split(" ")[1]
    if(token){
        const black= await blackmodel.find({token})
        if(black.length>0){
            res.send({msg:"please login again"})
        }else{
            try {
                const decoded =jwt.verify(token,process.env.jwtkey)
                req.body.userid =decoded.userid
                req.body.name =decoded.name
                req.body.time =new Data()
                next()
                
            } catch (error) {
                if (err.message === "jwt expired") {
                    res.send({ msg: "jwt expired please login" }); 
            }else{
                res.send(err)
            }
        }
    } 
}else{
    res.send({ msg: "login again" });
}
}
module.exports={auth}