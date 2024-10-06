const express = require('express');
const { ConncetDb } = require('./config/database');
const app = express();
ConncetDb()
    .then(()=>{
        console.log("database connected successfully");
        app.listen(3000,()=>{
            console.log("Serveris listening on port 3000")
        })
    })
    .catch((err)=>{
        console.error("Databas could not be connected");
    })