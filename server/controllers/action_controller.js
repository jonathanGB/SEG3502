const async = require('async')
const action = require('../models/action_model');
const utils = require('../utils/util');

exports.index = ({user: {type}}, res) => {
  res.render(`menu-${type}`)
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

exports.saveApplication = ({params: {id}, body: {grantApplication, expense, conference}}, res) => {
  async.series([
    (cb) => {
      saveTable(['presentationTitle', 'requestAdvanceFunds', 'presentationTypeName'], grantApplication, 'grantapplication', cb)
    },
    (cb) => {
      saveTable(['inscription', 'transport', 'logement', 'repas'], expense, 'expense', cb)
    },
    (cb) => {
      saveTable(['startDate', 'endDate', 'website', 'location', 'geoZoneName'], conference, 'conference', cb)
    }
  ], (error) => {
      return res.status(error ? 500 : 200).json({
        error
      })
  })

  function saveTable(validKeys, obj, tableName, asyncCb) {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        if (!validKeys.includes(key)) {
          delete obj[key]
        }
      })

      action.updateTable(tableName, id, obj, asyncCb)
    } else {
      asyncCb(null)
    }
  }
}


exports.submitApplication = ({params: {id}}, res) => {
  // assumption that all fields are ok (client-side check)
  action.updateStatus(id, 'pending supervisor', (error) => {
    res.status(error ? 500 : 200).json({
      error
    })
  })
}

exports.feedbackApplication = ({body: {response, recommandation}, params: {id}}, res) => {
  if (!response) {
    return res.status(401).json({
      error: 'no response provided'
    })
  }

  var newStatus;
  if (recommandation) {
    newStatus = "incomplete"
  }
  else if (response === "ok") {
    newStatus = "pending fgps"
  } else {
    newStatus = "refused"
  }

  if (recommandation) {
    action.feedbackApplication(id, newStatus, recommandation, (error) => {
      res.status(error ? 500 : 200).json({
        error
      })
    })
  } else {
    action.updateStatus(id, newStatus, (error) => {
      res.status(error ? 500 : 200).json({
        error
      })
    })
  }

}
