const mongoose = require('mongoose');
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

const User = mongoose.model("User",userSchema);
module.exports = User;

//module.exports = mongoose.model("User",userSchema). this can also be written
