const validator = require("validator");

const ValidateSignUpData = (req)=>{
    const{firstName,lastName,email,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not Valid")
    }else if(!validator.isEmail(email)){
        throw new Error("email is not valid")
    }else if (!validator.isStrongPassword(password)){
        throw new Error("please enter a strong Password")
    }
}
const validateEditProfileData = (req) => {
    const allowedEditFields = [
      "firstName",
      "lastName",
      "emailId",
      "photoUrl",
      "gender",
      "age",
      "about",
      "skills",
    ];
  
    const isEditAllowed = Object.keys(req.body).every((field) =>
      allowedEditFields.includes(field)
    );
  
    return isEditAllowed;
  };
  
const ValidateEditProfileData = (req)=>{
    const allowedEditFields = [
        "firstName",
        "lastName",
        "email",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
    ]

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field)) ;//what it will do it will itereate over each field passing in request.body and check if it is allowed then it will allow edit
       
    return isEditAllowed;
}
module.exports = {
    ValidateSignUpData,
    ValidateEditProfileData,
    validateEditProfileData
}