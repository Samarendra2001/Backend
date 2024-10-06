const express = require('express');
const ConncetDb = require('./config/database');
const User = require('./models/user');
const app = express();
app.post("/signUp",async (req,res)=>{
    const user = new User({//just created an instance of user model
        firstName:"Ms",
        lastName:"Dhoni",
        email:"ms@111.com",
        password:"ms@123"
    })
    try{
        await user.save();
        res.send("User added Successfully")
    }catch(err){
        res.status(400).send("Error adding the user ")
    }
})


ConncetDb()
    .then(()=>{
        console.log("database connected successfully");
        app.listen(3000,()=>{
            console.log("Serveris listening on port 3000")
        })
    })
    .catch((err)=>{
        console.error("Database could not be connected");
    })