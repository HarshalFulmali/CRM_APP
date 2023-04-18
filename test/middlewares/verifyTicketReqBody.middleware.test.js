const ticketVerify = require('../../Midleware/verifyTicketReqBody');
const {mockRequest, mockResponse} = require('../interceptor');

const ticketStatusForFail = {
    status:"OPENED"
}

const ticketStatusForPass = {
    status:"OPEN"
}

describe('verifying ticket status', ()=>{
    it("should be failed", async()=>{
        let req = mockRequest();
        let res = mockResponse();

        req.body = ticketStatusForFail;

        await ticketVerify.verifyTicketRequestStatus(req, res, jest.fn());

        expect(res.status).toHaveBeenCalledWith(400);
    })
});

describe('verifying ticket status',()=>{
    it("should be passed", async()=>{
        let req =mockRequest();
        let res = mockResponse();

        req.body = ticketStatusForPass;

        await ticketVerify.verifyTicketRequestStatus(req, res, jest.fn());

        expect(res.status).not.toHaveBeenCalled();
    })
});

describe("verify ticket body",()=>{
    it("should return fail", async()=>{
        let req = mockRequest();
        let res = mockResponse();

        req.body = {}

        await ticketVerify.verifyTicketRequestBody(req, res, jest.fn());

        expect(res.status).toHaveBeenCalledWith(400);
    })
});

const ticketBody = {
    title:"this is title",
    description:"snneqnrgqengoqeneqvnor"
}

describe("verify ticket body",()=>{
    it("should return pass", async()=>{
        let req = mockRequest();
        let res = mockResponse();

        req.body =ticketBody;

        await ticketVerify.verifyTicketRequestBody(req, res, jest.fn());

        expect(res.status).not.toHaveBeenCalled();
    })
})