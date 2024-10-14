
const User = require("../models/user");
const jwt = require('jsonwebtoken')

const UserAuth = async(req,res,next)=>{
    try{
        const {token} = req.cookies;
    if(!token){
        throw new Error ("Invalid token");
    }
    const decodeObj = await jwt.verify(token,"dr555asty");
    const {_id} = decodeObj;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found");
    }
    req.user = user;//here we are getting the user
    next();
    }catch(err){
        res.status(400).send(err.message)
    }
}

module.exports = {
    UserAuth
}