const express = require('express');
const { ValidateSignUpData } = require('../utils/validate');
const User = require('../models/user');
//const { UserAuth } = require('../middlewares/auth');
const authRouter = express.Router();
const bcrypt = require("bcrypt")

authRouter.post("/signUp",async(req,res)=>{
    try{
        //validation of data
        ValidateSignUpData(req);
        const {firstName,lastName,email,password} = req.body;
        
        //encrypt the password
        const passwordHash = await bcrypt.hash(password,10);

        const user = new User({
            firstName,lastName,email,password:passwordHash,
        })
        await user.save();
        res.send("User added Successfully")
    }catch(err){
        res.status(400).send("Error:"+ err.message)
    }
})

authRouter.post("/logIn", async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            const token = await user.getJWT();
            res.cookie("token",token,{
                expires:new Date(Date.now()+8*3600000),
            })
            res.send("LogIn Successful");
        }else{
            throw new Error("Invalid credentials");
        }
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});
authRouter.post("/logOut", async (req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    .send("loggedOut Successfully")
})

module.exports = authRouter;

