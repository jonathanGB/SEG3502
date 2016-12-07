const userController = require('../controllers/user_controller');
const auth = require('../auth');

module.exports = (app) => {
  app.get('/', userController.renderLogin)
  app.post('/user/login', userController.login);
  app.get('/user/logoff', auth.authenticate, userController.logOff)
  app.post('/user/add', auth.authenticate, auth.adminCheck, userController.addUser)
};
