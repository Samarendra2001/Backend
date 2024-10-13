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
        lowercase:true,//if the user write with captial letters it will be added with lowercase
        unique:true,//it will not allow you to create a new user with same emailId
        trim:true//if someone try same email with some spaces mongoose takes it as another email so for that this is used
    },
    password:{
        type:String,
        required:true
    }

},{timestamps:true})

userSchema.method.getJWT = async function (){
    const user = this;

    const token = await jwt.sign({_id:user._id},"dr555asty",{expiresIn:"7d"});
    return token;
}
userSchema.method.validatePassword =  async function (passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash)
    return isPasswordValid;
}
const User = mongoose.model("User",userSchema);
module.exports = User;

//module.exports = mongoose.model("User",userSchema). this can also be written
