const mongoose=require("mongoose")
const userschema = mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    password:String
})
const UserModel =mongoose.model("user",userschema)

module.exports={ UserModel}