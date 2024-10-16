const express = require('express');
const { UserAuth } = require('../middlewares/auth');
const { ValidateEditProfileData, validateEditProfileData } = require('../utils/validate');
//const { ValidateEditProfileData } = require('../utils/validate');
const profileRouter = express.Router();

profileRouter.get("/profile/view",UserAuth, async (req,res)=>{
    try{
        const user = req.user;
            res.send(user);
            }catch(err){
            res.stauts(404).send("Error:" + err.message)
        }
});
profileRouter.patch("/profile/edit", UserAuth, async (req,res)=>{
    try {
        ////validate data
        if (!ValidateEditProfileData(req)) {
            console.log("Hi")
          throw new Error("Invalid Edit Request");
        }
    
        const loggedInUser = req.user;
        //console.log(loggedInUser);
        //we can update in this way also as we have got loggedIN user so we can update them accordingly
        //loggedInUser.firstName = req.body.firstName;
        //loggedInUser.lastName = req.body.lastName; // and so on 
        //but this method is cleaner method 
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));//what it will do it will iterate over each element in req.body and it will update the loggedinUser value whatever value getting from req.body
    
        await loggedInUser.save();
    
        res.json({
          message: `${loggedInUser.firstName}, your profile updated successfuly`,
          data: loggedInUser,
        });
      } catch (err) {
        res.status(400).send("ERROR : " + err.message);
      }
})

module.exports = profileRouter