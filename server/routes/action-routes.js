const actionController = require("../controllers/action_controller")
const auth = require("../auth")

module.exports = function (app) {
  app.get('/menu', auth.authenticate, actionController.index)
  app.get('/application/', auth.authenticate, actionController.getRelatedApplications)
  app.get('/application/:id(\\d+)', auth.authenticate, auth.visibleAppCheck, actionController.renderApplication)
  app.put('/application/:id(\\d+)', auth.authenticate, auth.requesterCheck, actionController.saveApplication)
  app.get('/application/new', auth.authenticate, auth.requesterCheck, actionController.createApplication)
  app.post('/application/:id/submit', auth.authenticate, auth.requesterCheck, auth.visibleAppCheck, actionController.submitApplication)
  app.put('/application/:id/supervisorResponse', auth.authenticate, auth.supervisorCheck, auth.visibleAppCheck, actionController.feedbackApplication)
};
