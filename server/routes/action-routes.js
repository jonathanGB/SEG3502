const actionController = require("../controllers/action_controller")
const auth = require("../auth")

module.exports = function (app) {
  app.get('/', auth.authenticate, actionController.index)
};
