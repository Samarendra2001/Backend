const express = require ("express");
const app = express();


//this is request handler.. that means it will give response in any route from this server
app.use((req,res)=>{
    res.send("Hello from Server");
})

app.use("/test",(req,res)=>{
    res.send("Hello from Server");//this will give response from /test route only.
})

app.listen(3000,()=>{
    console.log("Hi there");
});