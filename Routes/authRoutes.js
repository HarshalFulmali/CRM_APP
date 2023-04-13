const authController = require('../Controllers/authController')
const verifySingUp = require('../Midleware/verifySingup')

module.exports = (app) => {
    app.post('/crm/api/v1/auth/signup',[verifySingUp.verifySignUpRequest], authController.signUp);
    app.post('/crm/api/v1/auth/signin',[verifySingUp.verifySignInRequest], authController.signIn);
}