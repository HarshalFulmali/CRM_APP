const Ticket = require('../Models/ticketModel');
const User = require('../Models/user');
const { userStatus, userTypes } = require('../utils/constants');


exports.createTicket = async (req, res) => {
    const ticketObj = {
        title: req.body.title,
        ticketPiority: req.body.ticketPiority,
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

        return res.status(200).send(ticket);
    }
    catch(error) {
        return res.status(400).send({message:"Internal server error"})
    }
}