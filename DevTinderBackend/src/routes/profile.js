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
        console.log(loggedInUser);
    
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    
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