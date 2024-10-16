const express = require('express');
const ConncetDb = require('./config/database');
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authentication");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests")
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/",requestRouter)
ConncetDb()
    .then(()=>{
        console.log("database connected successfully");
        app.listen(3000,()=>{
            console.log("Serveris listening on port 3000")
        })
    })
    .catch((err)=>{
        console.error("Database could not be connected");
    });