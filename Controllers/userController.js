const User = require('../Models/user');
const bcrypt = require('bcrypt');
const { userStatus } = require('../utils/constants')

exports.createUser = async (req, res)=>{
    const user = await User.create({
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        userType: req.body.userType,
        userStatus:req.body.userStatus
    });

    if(!user) {
        return res.status(400).send({message:"Invalid detail"});
    }

    return res.status(201).send(user);
}

exports.getAllUsers = async (req, res)=>{
    try{
        const users = await User.find({});
        return res.status(200).send(users);
    }
    catch(error){
        return res.status(500).send({message:'Internal server error'});
    }
}

exports.getUserById = async(req, res) =>{
    try{
        const id = req.params.id;
        const user = await User.find({_id:id});

        if(!user || !(user.length)) {
            return res.status(400).send({message:'Invalid user id'});
        }

        return res.status(200).send(user);
    }
    catch(error) {
        return res.status(500).send({message:'Internal server error'});
    }
}

exports.deleteUser = async (req, res) => {
    try{
        await User.deleteOne({_id:req.params.id});
        return res.status(200).send({message:"deleted successfully"})
    }
    catch(e) {
        return res.status(500).send({message:'Internal server error'})
    }
}

exports.userUpdate = async(req, res)=>{
    const updateUserId = req.params.id;

    const saveUser = await User.findOne({_id:updateUserId});

    if(req.body.status === userStatus.approved) {
        saveUser.userStatus = userStatus.approved;
    }

    const updatUser = await saveUser.save();

    return res.status(200).send(updatUser)

}