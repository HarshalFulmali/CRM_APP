const {ticketStatus} = require('../utils/constants');

const verifyTicketRequestBody = (req, res, next) => {
    if(!req.body.title) {
        return res.status(400).send({message:"Failed! Title is not present"});
    }

    if(!req.body.description) {
        return res.status(400).send({message:"Failed! Description is not present"});
    }

    next()
}

const verifyTicketRequestStatus = (req, res, next) => {
    const status = req.body.status;

    const possibleStatus = [ticketStatus.open, ticketStatus.inProgress, ticketStatus.blocked, ticketStatus.closed];

    if(status && !possibleStatus.includes(status)) {
        return res.status(400).send({message:`Status should be among ${possibleStatus}`})
    }

    next();

}

module.exports = {
    verifyTicketRequestBody,
    verifyTicketRequestStatus
}