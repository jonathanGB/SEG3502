const userController = require('../controllers/user_controller');
const auth = require('../auth');

module.exports = (app) => {
    //app.get('/users', userController.findAllUsers) // helper
    // app.post('/users', userController.register)
    // app.get('/user/:username', userController.findUser)
    //
    app.post('/login', userController.login);
    // app.put('/user/:username', auth.authenticate, userController.changeUser)
    app.get('/logoff', auth.authenticate, userController.logOff)
};
