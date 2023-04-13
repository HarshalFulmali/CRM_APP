const { createUser, getAllUsers, getUserById, deleteUser }= require('../Controllers/userController')


module.exports = function(app) {
    app.post('/crm/api/v1/users', createUser);
    app.get('/crm/api/v1/users',getAllUsers);
    app.get('/crm/api/v1/users/:id', getUserById);
    app.delete('/crm/api/v1/users/:id', deleteUser)
}