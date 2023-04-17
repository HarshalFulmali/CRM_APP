const Ticket = require('../Models/ticketModel');
const User = require('../Models/user');
const { userStatus, userTypes } = require('../utils/constants');
const emailScript = require('../script/emailNotificationScripts');
const { sendEmail } = require("../utils/notificationClient")

exports.createTicket = async (req, res) => {
    const ticketObj = {
        title: req.body.title,
        ticketPriority: req.body.ticketPriority,
        description: req.body.description,
        status: req.body.status,
        requestor: req.userId
    }

    const engineer = await User.findOne({
        userType:userTypes.engineer,
        userStatus: userStatus.approved
    });

    ticketObj.assignee = engineer.userId;

    try{
        const ticket = await Ticket.create(ticketObj);

        const user = await User.findOne({userId: req.userId});
        const {subject,text,html} = emailScript.createdTicketNotification(ticket,user);

        sendEmail([user.email],subject,text,html);

        return res.status(200).send(ticket);
    }
    catch(error) {
        return res.status(400).send({message:"Internal server error"+error})
    }
}

exports.getAllTicket = async (req, res) => {

    const userId = req.userId;

    const savedUser = await User.findOne({userId: userId});
    const userType = savedUser.userType;

    let queryObj = {};

    if(userType === userTypes.customer){
        queryObj = {requestor:userId}
    } else if(userType === userTypes.engineer) {
        queryObj = { $or: [{assignee:userId}, {requestor: userId}]}
    }

    const tickets = await Ticket.find(queryObj);

    return res.status(200).send(tickets);
}

exports.getTicketById = async (req, res) =>{

    const userId = req.userId;

    const savedUser = await User.findOne({userId: userId});
    const userType = savedUser.userType;

    var queryObj = {_id:req.params.id};
    const saveTicket = await Ticket.findOne(queryObj);

    if(userType === userTypes.admin) {
        return res.status(200).send(saveTicket);
    }
    if(saveTicket.requestor === userId || saveTicket.assignee === userId){
        return res.status(200).send(saveTicket);
    }

    return res.status(403).send({message: "User has insufficent permission to access the ticket"});
}

exports.updateTicketById = async (req, res)=> {

    const userId = req.userId;
    const ticketId = req.params.id;

    const savedTicket = await Ticket.findOne({_id:ticketId});
    const savedUser = await User.findOne({userId:userId});

    if(savedUser.userType === userTypes.admin || savedTicket.requestor === userId || savedTicket.assignee === userId){
        
        savedTicket.title = req.body.title ? req.body.title : savedTicket.title;
        savedTicket.description = req.body.description ? req.body.description : savedTicket.description;
        savedTicket.ticketPriority = req.body.ticketPriority ? req.body.ticketPriority : savedTicket.ticketPriority;
        savedTicket.status = req.body.status ? req.body.status : savedTicket.status;
        savedTicket.assignee = req.body.assignee ? req.body.assignee : savedTicket.assignee;
        
        const updateTicket = await savedTicket.save();
        return res.status(200).send(updateTicket);
    }

    return res.status(400).send({message:"The User has insufficient permission to update this ticket"});

}