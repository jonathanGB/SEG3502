const user = require('../models/user_model')
const utils = require('../utils/util')
const jwt = require('jwt-simple')
const cfg = require('../config')
const bcrypt = require('bcrypt')


module.exports.register = ({body: {username = null, password = null}}, res) => {
    if (utils.isEmpty(username)) {
        res.status(401).json({
            error: true,
            data: "Username is Null"
        })
    } else if (utils.isEmpty(password)) {
        res.status(401).json({
            error: true,
            data: "password is Null"
        })
    } else {
        user.register(username, password, (err, data) => {
            res.status(err ? 500 : 201).json({
                error: err,
                data: data
            })
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
  user.logOff(loginid, type, (err) => {
    res.status(err ? 400: 200).json({
      err
    })
  })
}
