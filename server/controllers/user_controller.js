const user = require('../models/user_model')
const utils = require('../utils/util')
const jwt = require('jwt-simple')
const cfg = require('../config')
const bcrypt = require('bcrypt')

module.exports.addUser = ({body}, res) => {
  if (!body) {
    return res.status(400).json({
      error: 'No body provided'
    })
  }

  switch (body.userType) {
  case "admins":
    user.addAdmin(body, addUserFeedback)
    break
  case "supervisors":
    user.addSupervisor(body, addUserFeedback)
    break
  case "requesters":
    user.addRequester(body, addUserFeedback)
    break
  default:
    res.status(401).json({
      error: "bad type"
    })
  }

  function addUserFeedback(err) {
    res.status(err ? 400 : 200).json({
      err
    })
  }
}

module.exports.login = ({body: {loginId, password, type}}, res) => {
    if (!loginId || !password || !type) {
        return res.sendStatus(401)
    }

    user.login(loginId, password, type, (err, data) => {
        console.log(data)

        if (err || !data) {
          console.log(err)
            return res.sendStatus(404)
        }
        console.log(data)
        const payload = {
            id: data.loginid,
            type,
            timestamp: new Date()
        }

        const token = jwt.encode(payload, cfg.jwtSecret)
        res.status(200).json({
            error: null,
            data: token
        })
    })
}

module.exports.logOff = ({user: {type, data: {loginid}}}, res) => {
  user.logOff(loginid, type, (error) => {
    res.status(error ? 400: 200).json({
      error
    })
  })
}
