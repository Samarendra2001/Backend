const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    age:{
        type:Number,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    }

},{timestamps:true})

userSchema.methods.getJWT = async function (){
    const user = this;

    const token = await jwt.sign({_id:user._id},"dr555asty",{expiresIn:"7d"});
    return token;
}
userSchema.methods.validatePassword =  async function (passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash)
    return isPasswordValid;
}
const User = mongoose.model("User",userSchema);
module.exports =  User;