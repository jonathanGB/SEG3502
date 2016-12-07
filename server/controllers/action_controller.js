const async = require('async')
const action = require('../models/action_model');
const utils = require('../utils/util');

exports.index = ({user: {type, data: {givenname, isloggedin}}}, res) => {
  res.render('menu', {
    [type]: type,
    name: givenname,
    isloggedin
  })
}

exports.getRelatedApplications = ({user: {type, data: {loginid, empnumber, isloggedin}}}, res) => {
  const sentId = (type === "admins" ? null : type === "requesters" ? loginid : empnumber)

  action.getApplicationSupervisor(empnumber, (error, applications) => {
    if (error) {
      return res.status(500).json({
        error
      })
    }
    console.log('applications', applications.length)
    res.render('viewSupervisorApps', {
      applications,
      isloggedin
    })
  })
}

exports.renderApplication = ({params: {id}, user: {type, data: {loginid, empnumber, isloggedin}}}, res) => {
  res.render('createApp', {
    appId: id,
    isloggedin
  })
}

exports.createApplication = ({user: {data: {loginid, supervisorid}}}, res) => {
  action.createApplication(loginid, supervisorid, (err, appId) => {
    if (err) {
      res.status(500).json({
        error: 'not able to create application'
      })
    } else {
      res.redirect(`/application/${appId}`)
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

exports.feedbackApplication = ({body: {response, recommandations}, params: {id}}, res) => {
  if (!response) {
    return res.status(401).json({
      error: 'no response provided'
    })
  }

  var newStatus;
  if (response === "incomplete") {
    newStatus = "incomplete"
  }
  else if (response === "ok") {
    newStatus = "pending fgps"
  } else {
    newStatus = "refused"
  }
  console.log(response)
  console.log('status', newStatus)

  if (recommandations) {
    action.feedbackApplication(id, newStatus, recommandations, (error) => {
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
