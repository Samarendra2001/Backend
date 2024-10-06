const express = require ("express");
const { Adminauth, UserAuth } = require("./middlewares/auth");
const app = express();

app.use("/admin",Adminauth);//this means as we studied earlier the route starts with /admin
//has to first check with admin auth middleware for every /admin routes . If it is verifies then it will be run.
//this is one way of using middleware.
//As we dont have to check authentication for all the routes starts with /user so we can use /userAuth middleware where it is needed

app.get("/admin/getData",(req,res)=>{
    res.send("Admin Data fetched")
})
app.get("/admin/delete",(req,res)=>{
    res.send("Admin Data deleted")
})
app.get("/user/getData",UserAuth,(req,res)=>{//here we have used userauth middleware
    res.send("user Data fetched")
})
app.get("/user/delete",UserAuth,(req,res)=>{
    res.send("user Data deleted")
})
app.get("/user/login",(req,res)=>{//user middleware not needed here as login function should be for everyone So we have not used.
    res.send("UserloggedIn Successfully")
})

app.listen(3000);