const express = require('express');
const app = express();//this app starts a server and listens on specified ports

app.get('/',(req,res)=>{//1st parameter'll be 'req' & second will be 'res'bcz 1st we request then we get the response back
    res.send("Hello World");
})

const port = 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})