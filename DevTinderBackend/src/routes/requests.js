const express = require("express");
const { UserAuth } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connection");
const requestRouter = express.Router();


requestRouter.post("/request/send/:status/:toUserId",UserAuth, async (req,res)=>{
    try{
        const fromUserId = req.user._id; //you might be thinking where did user came from without even defining it 
        //do you remember in userAuth we have returned req.user and here 1st we are using userAuth middleware then we 
        //are going further . So this req.user come from auth middleware
        //console.log(fromUserId);
        const toUserId = req.params.toUserId;
        //console.log(toUserId);
        const status = req.params.status;
        //this edge case is because only 2 statusses are allowed and if somebody entry another status it should return error
        const allowedStatus = ["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res
                .status(400)
                .json({message:"Invalid status type" + status});
        }
        //this is the edge case of suppose if userId is not exist in your database and you are sending some random userid , it should respond with error
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res 
                .status(400)
                .json({message:"User not Found"})
        }
        //this is the edge case of supose the connection request already exist from A to B or B to A and it should respnd error while another request made with same userId
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId},
            ]
        })
        if(existingConnectionRequest){
            return res 
                .status(400)
                .json({message:"Connection Request already exist"})
        }
        //here new instance of connection request made using connection request model
        const connectionRequest = new ConnectionRequest({
            fromUserId,toUserId,status,
        })
        //this is the edge case of suppose oe user wants to connect with himself , it shoud give an error
        if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
            throw new Error("Cannot send connection request to yourself!");
        }
        const data = await connectionRequest.save();
        res.json({
            message:
              req.user.firstName + " is " + status + " in " + toUser.firstName,
            data,
          });
    }catch(err){
        res.status(400).send("Error :"+ err.message);
    }
})

module.exports = requestRouter;