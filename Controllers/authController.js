const User = require('../Models/user');
const { userTypes, userStatus } = require('../utils/constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');



exports.signUp = async (req, res) => {
    
    var userType = req.body.userType;
    var status; 

    if(!userType || userType === userTypes.customer) {
        status = userStatus.approved;
    } else {
        status = userStatus.pending
    }

    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        userType: req.body.userType,
        userStatus: status
    }

    try{
        const user = await User.create(userObj);
        res.status(201).send({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            message: "user created successfully"
        })

    }
    catch(error) {
        res.status(500).send({message: "server error"});
    }

}

exports.signIn = async (req, res)=> {
    const user = await User.findOne({userId: req.body.userId});

    if(user === null) {
        return res.status(400).send({message:"Invalid userId"});
    }

    const isPasswordVaild = bcrypt.compareSync(req.body.password, user.password);

    if(!isPasswordVaild) {
        return res.status(400).send({message:"Invalid Password"})
    }

    const token = jwt.sign({id:user.userId}, authConfig.secret,{expiresIn:86400});
    res.status(201).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        userStatus: user.userStatus,
        access: token
    })
}