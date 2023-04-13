const { createUser, getAllUsers, getUserById, deleteUser, userUpdate }= require('../Controllers/userController');
const authVaildator = require('../Midleware/authJWT')


module.exports = function(app) {
    app.post('/crm/api/v1/users', createUser);
    app.get('/crm/api/v1/users',[authVaildator.verifyToken, authVaildator.isAdmin], getAllUsers);
    app.get('/crm/api/v1/users/:id',[authVaildator.verifyToken, authVaildator.isAdminOrOwnUser], getUserById);
    app.delete('/crm/api/v1/users/:id',[authVaildator.verifyToken, authVaildator.isAdmin], deleteUser);
    app.put('/crm/api/v1/users/:id',[authVaildator.verifyToken, authVaildator.isAdmin], userUpdate);
}