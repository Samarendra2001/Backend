const Adminauth = (req,res,next)=>{
    const token = "abc";
    const isAuthorized = token ==="abc";
    if(!isAuthorized) {
        res.status(401).send("UnAuthorized Requests")
    }else{
        next();
    }
}

const UserAuth = (req,res,next)=>{
    const token ="xyz";
    const isUserAuthorized = token ==="xyz";
    if(!isUserAuthorized){
        res.status(401).send("Unauthorized Access");
    }else next();
}

module.exports = {
    Adminauth,UserAuth
}