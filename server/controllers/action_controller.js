const action = require('../models/action_model');
const utils = require('../utils/util');

exports.index = (req, res) => {
  res.status(203).json("not implemented yet")
  // TODO: render according to user and type home
}

exports.getRelatedApplications = ({user: {type, data: {loginid, empnumber}}}, res) => {
  const sentId = (type === "admins" ? null : type === "requesters" ? loginid : empnumber)

  action.getApplications(type, sentId, (error, applications) => {
    if (error) {
      return res.status(500).json({
        error
      })
    }

    return res.status(200).json({
      error,
      data: applications
    })
  })
}

exports.renderApplication = ({params: {id}, user: {type, data: {loginid, empnumber}}}, res) => {
  res.status(203).json("not implemented yet") // TODO: remove when real method implemented

  // TODO: here we render the application depending on the type of user
  // e.g. a requester wants to see the form (create application case), while the supervisor wants to see the expenses only (make recommandation)
  if (type === "admins") {
    // what?
    action.getApplicationAdmin(id, (err, data) => {

    })
  } else if (type === "requesters") {
    // what?
    action.getApplicationRequester(id, (err, data) => {

    })
  } else if (type === "supervisors") {
    // what?
    action.getApplicationSupervisor(id, (err, data) => {

    })
  }
}

exports.createApplication = ({user: {data: {loginid, supervisorid}}}, res) => {
  action.createApplication(loginid, supervisorid, (err, appId) => {
    if (err) {
      res.status(500).json({
        error: 'not able to create application'
      })
    } else {
      res.redirect(`/application/edit/${appId}`)
    }
  })
}

exports.saveApplication = ({params: {id}, body}, res) => {
  // TODO: get all body data
  // TODO: update necessary tables
}
