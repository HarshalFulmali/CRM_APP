const jwt = require('jsonwebtoken');
const authConfig= require('../configs/auth.config');
const User = require('../Models/user');
const { userTypes } = require('../utils/constants')

const verifyToken = (req, res, next)=>{
    var token = req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send({message:"No Token Provided"});
    }

    jwt.verify(token,authConfig.secret,(error,payload)=>{
        if(error) {
            return res.status(403).send({message: "Invalid JWT Token"});
        }
        
        req.userId = payload.id;
        next();
    })
    
}

const isAdmin = async (req, res, next) => {
    const user = await User.findOne({userId:req.userId});

    if(user && user.userType === userTypes.admin) {
        next();
    } else {
        return res.status(403).send({message:"Only Admin are allowed to access this route"});
    }
}

const isAdminOrOwnUser = async (req, res, next) =>{
    
    const user = await User.findOne({userId:req.userId});

    if((user && user.userType === userTypes.admin) || (user.id === req.params.id)) {
        next();
    }else {
        return res.status(403).send({message: "your are not allowed to access this route"});
    }
}

module.exports = {
    verifyToken,
    isAdmin,
    isAdminOrOwnUser
}