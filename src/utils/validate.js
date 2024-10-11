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
module.exports = {
    ValidateSignUpData
}