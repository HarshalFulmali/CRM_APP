const ticketController = require('../Controllers/ticketController');
const authJWT = require('../Midleware/authJWT')


module.exports = (app)=>{
    app.post("/crm/api/v1/tickets",[authJWT.verifyToken], ticketController.createTicket);
}