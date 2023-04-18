const User = require('../Models/user');
const { userTypes, userStatus } = require('../utils/constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const emailScript = require('../script/emailNotificationScripts');
const { sendEmail } = require("../utils/notificationClient")


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
        
        // send notification mail to registored email for successfully registoring

        const {subject, text, html} = emailScript.userRegistrationNotification(user);
        sendEmail([user.email],subject,text,html)
        
        const userResposneObj = {
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus,
            message: "user created successfully"
        }

        

        res.status(201).send({ userResposneObj })

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

    if(user.userStatus != userStatus.approved) {
        return res.status(200).send(`can't allow to login as this user in ${user.userStatus} status`);
    }

    const isPasswordVaild = bcrypt.compareSync(req.body.password, user.password);

    if(!isPasswordVaild) {
        return res.status(400).send({message:"Invalid Password"})
    }

    const token = jwt.sign({id:user.userId}, authConfig.secret,{expiresIn:86400});
    res.status(201).send({
        id:user._id,
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        userStatus: user.userStatus,
        access: token
    })
}