
const User = require('../Models/user');
const { userTypes } = require('../utils/constants')

const verifySignUpRequest = async (req, res, next)=>{

    if(!req.body.name) {
        return res.status(400).send({message:"Failed! UserName doesn't exists"});
    }

    if(!req.body.userId) {
        return res.status(400).send({message:"Failed! UserId doesn't exists"});
    }

    var user = await User.findOne({userId:req.body.userId});

    if(user != null) {
        return res.status(400).send({message:"Failed! userId already exists"});
    }

    user = await User.findOne({email:req.body.email});

    if(user != null) {
        return res.status(400).send({message:"Failed!, email already exists"});
    }

    const vaildUserType = [userTypes.engineer, userTypes.customer, userTypes.admin];
    const userType = req.body.userType;

    if(userType && !vaildUserType.includes(userType)) {
        return res.status(400).send({message:`Failed!, UserType should be among ${vaildUserType}`});
    }

    next();

}

const verifySignInRequest = async (req, res, next)=> {
    if(!req.body.userId) {
        return res.status(400).send({message:"Failed!, userId doesn't exists"})
    }
    if(!req.body.password) {
        return res.status(400).send({message:"Failed!, userId doesn't exists"})
    }
    next();
}

module.exports = {
    verifySignUpRequest,
    verifySignInRequest
}