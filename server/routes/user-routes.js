const userController = require('../controllers/user_controller');
const auth = require('../auth');

module.exports = (app) => {
    app.post('/user/login', userController.login);
    app.put('/user/logoff', auth.authenticate, userController.logOff)
    app.post('/user/add', auth.authenticate, auth.adminCheck, userController.addUser)
};
