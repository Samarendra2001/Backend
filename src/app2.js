const express = require('express');
const ConncetDb = require('./config/database');
const User = require('./models/user');
const app = express();
app.use(express.json())//so after using this middleware now we are getting the all the data in the console
//so simply replace it with static data in the code
app.post("/signUp",async (req,res)=>{
    console.log(req.body);//so now for dynamic getting the value if we will use req.body
    //then it will give the output as undefined as the data which is being passed in postman is in Json format
    //but our server does not understand json
    //for this we'll use a middleware which will help us to read  the json data
    //that is express.json()
    //And we know we use (app.use("/") as it is applied to all the route .
    const user = new User(req.body)
    try{
        await user.save();
        res.status(200).send("User added Successfully dynamically ")
    }catch(err){
        res.status(500).send("Error adding user")
    }
    
    // const user = new User({//just created an instance of user model
    //     firstName:"Ms",
    //     lastName:"Dhoni",
    //     email:"ms@111.com",
    //     password:"ms@123"
    // })
    // try{
    //     await user.save();
    //     res.send("User added Successfully")
    // }catch(err){
    //     res.status(400).send("Error adding the user ")
    // }
})
//in this /user api you will get the data of one user by its emailid
    app.get("/user",async(req,res)=>{
        const useremail = req.body.email;
        try{
            const user = await User.findOne({email:useremail});
            //const user = await User.find({email:req.body.email}) //this can also be written
           if(!user){
                res.send("User not found")
           }else{
            res.send(user);
           }
           
        }catch(err){
            res.stauts(404).send("something went wrong")
        }
    })
    //in this feed api you will get the data of all the users
    app.get("/feed",async (req,res)=>{
        try{
            const user = await User.find({});//this empty object means it will give all the data of the users
            res.send(user);
        }catch(err){
            res.stauts(404).send("Something went wrong")
        }
    })

    app.get("/byId",async (req,res)=>{
        const userId = req.body._id;
        try{
            const user = await User.findById(userId)//findbyId does not require an object as parameter it can directly tkaes the id
            if(!user){
                res.send("User not found")
            }else{
                res.send(user);
            }
        }catch(err){
            res.status(404).send("Something went wrong")
        }
    })
    app.delete("/user",async (req,res)=>{
        const userId = req.body._id;
        try{
           const user =  await User.findByIdAndDelete(userId)
            if(!user){
                res.send("User not found")
            }else{res.send("User deleted Successfully")}
        }catch(err){
            res.status(404).send("Something went wrong")
        }
    })
    app.patch("/user",async (req,res)=>{
        const userId = req.body._id;
        const data = req.body;
        try{
            //const user = await User.findByIdAndUpdate(userId,{firstName:'Samarendra',lastName:'Samar'})//in this way update can be done
            //another way is there
            //const user = await User.findByIdAndUpdate(userId,data);//this means you are updating dat adynamically in postman
            console.log(user);//if you dont pass anything in option bydefault this log will give you the previous data not the updated one
            const user = await User.findByIdAndUpdate(userId,data,{returnDocument:"after"})
            console.log(user);//this will give you the updated dat in colsole as you have specified after            
            if(!user){
                res.send("User not found")
            }else{
                res.send("User Updated Successfully")
            }
        }catch(err){
            res.status(404).send("Something went wrong")
        }
    })
    //this is update the data using emailId
    app.patch("/user1",async(req,res)=>{
        const userEmail = req.body.email;
        const data = req.body;
        try{
            const user = await User.findOneAndUpdate({email:userEmail},data);
            console.log(user);
            if(!user){
                res.send("User not found");
            }else{
                res.send("User Updated Successfully");
            }
        }catch(err){
            res.status(404).send("Something went wrong")
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