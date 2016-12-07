const user = require('../models/user_model')
const utils = require('../utils/util')
const jwt = require('jwt-simple')
const cfg = require('../config')
const bcrypt = require('bcrypt')

module.exports.renderLogin = (req, res) => {
  res.render('login')
}

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
      error: "bad user type"
    })
  }

  function addUserFeedback(err) {
    res.status(err ? 400 : 200).json({
      err
    })
  }
}

module.exports.login = ({cookies, body: {loginId, password, type}}, res) => {
  console.log('cookies', cookies)
    if (!loginId || !password || !type) {
        return res.status(401).json({
          error: "missing info"
        })
    }

    user.login(loginId, password, type, (err, data) => {
        console.log(data)

        if (err || !data) {
          console.log(err)
            return res.status(404).json({
              error: 'user not in db'
            })
        }
        console.log(data)
        const payload = {
            id: data.loginid,
            type,
            timestamp: new Date()
        }

        const token = jwt.encode(payload, cfg.jwtSecret)
        res.cookie('token', token).json({
          redirect: '/menu'
        })
    })
}

module.exports.logOff = ({user: {type, data: {loginid}}}, res) => {
  user.logOff(loginid, type, (error) => {
    res.clearCookie('token').redirect('/')
  })
}
