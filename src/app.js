const express = require ("express");
const app = express();


//this is request handler.. that means it will give response in any route from this server
app.use((req,res)=>{
    res.send("Hello from Server");
})

app.use("/test",(req,res)=>{
    res.send("Hello from Server");//this will give response from /test route only.Only if it is the first route
})

app.use("/hello/2",(req,res)=>{
    res.send("Hello Sam")
})
app.use("/hello/",(req,res)=>{
    res.send("Hello Samar")
})

//the above two rotes will only work if it is in this order if the second route "/hello" put first and "/heelo/2" routes put after that then response
//will only come from "/hello" only. So What am I trying to say is order of routes matter a lot.
//thi is only because we are using app.use(). It is not in get , post.
app.listen(3000,()=>{
    console.log("Hi there");
});