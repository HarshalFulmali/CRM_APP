const ticketController = require('../Controllers/ticketController');
const authJWT = require('../Midleware/authJWT');
const ticketValidator = require('../Midleware/verifyTicketReqBody');


module.exports = (app)=>{
    app.post("/crm/api/v1/tickets",[authJWT.verifyToken, ticketValidator.verifyTicketRequestBody], ticketController.createTicket);
    app.get("/crm/api/v1/tickets",[authJWT.verifyToken], ticketController.getAllTicket);
    app.get("/crm/api/v1/tickets/:id",[authJWT.verifyToken], ticketController.getTicketById);
    app.put("/crm/api/v1/tickets/:id",[authJWT.verifyToken, ticketValidator.verifyTicketRequestStatus], ticketController.updateTicketById);
}