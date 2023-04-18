const userController = require('../../Controllers/userController');
const { mockRequest, mockResponse } = require('../interceptor');
const User = require('../../Models/user');
const { Promise } = require('mongoose');

const userTestPayload = {
    name:"harshal",
    userId:"harshalF",
    email:"harshal@gmail.com",
    password:"harshal@123",
    userType:"CUSTOMER",
    userStatus:"APPROVED"
}

describe("find all user", () =>{

    it("should return all users", async ()=>{
        

        let req = mockRequest();
        let res = mockResponse();

        const userSpy = jest.spyOn(User,'find').mockReturnValue([userTestPayload]);

        await userController.getAllUsers(req,res);

        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    userId:"harshalF",
                    email:"harshal@gmail.com"
                })
            ])
        )
    })
});


const userUpdateValue={
    status:"APPROVED"
}

const userUpdateTestPayload = {
    name: "harshal",
    userId: "harshalF",
    email: "harshal@gmail.com",
    password: "harshal@123",
    userType: "ENGINEER",
    userStatus: "PENDING",
    save: jest.fn()
}

const returnTestPayload = {
    name: "harshal",
    userId: "harshalF",
    email: "harshal@gmail.com",
    password: "harshal@123",
    userType: "ENGINEER",
    userStatus: "APPROVED",
    save: jest.fn()
}

describe("Update user", ()=>{

    it("user should be updated", async()=>{

        let req = mockRequest();
        let res = mockResponse();

        req.params={id:1};
        req.body = userUpdateValue;

        jest.spyOn(userUpdateTestPayload, 'save').mockReturnValueOnce((returnTestPayload));

        const userSpy = jest.spyOn(User, 'findOne').mockReturnValue((userUpdateTestPayload));

        await userController.userUpdate(req, res);

        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                userStatus:"APPROVED"
            })
        )
    })
});

describe("get user by id", ()=>{
    it("should return user by id", async()=>{
        let req = mockRequest();
        let res = mockResponse();

        req.params={id:1};

        const userSpy = jest.spyOn(User, 'findOne').mockReturnValue((userTestPayload));

        await userController.getUserById(req,res);

        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    userId:"harshalF",
                    name:"harshal",
                    email:"harshal@gmail.com"
                })
            ])
        )
    })
})

describe("create user", ()=>{
    it("should retune created user", async()=>{
        let req = mockRequest();
        let res = mockResponse();

        req.body = userTestPayload;

        const userSpy = jest.spyOn(User, 'create').mockReturnValue(userTestPayload);

        await userController.createUser(req, res);

        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(
            
                expect.objectContaining({
                    name:"harshal",
                    userType:"CUSTOMER",
                    userStatus:"APPROVED"
                })
            
        )
    })
})