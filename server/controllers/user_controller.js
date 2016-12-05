const user = require('../models/user_model')
const utils = require('../utils/util')
const jwt = require('jwt-simple')
const cfg = require('../config')
const bcrypt = require('bcrypt')

module.exports.findAllUsers = (req, res) => {
    user.findAllUsers((err, data) => {
        res.status(err ? 404 : 200).json({
            error: err,
            data: data
        })
    })
}

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

module.exports.findUser = (req, res) => {
    user.findUser(req.params.username, (err, data) => {
        res.status(err ?
            400 :
            data ?
                202 :
                404).json({
            'error': err,
            'data': data
        });
    })
}

module.exports.login = ({body: {loginId, password, type}}, res) => {
    if (!loginId || !password || !type) {
        return res.sendStatus(401)
    }

    user.login(loginId, password, type, (err, data) => {
        console.log(data)

        if (err || !data) {
            return res.sendStatus(404)
        }

        const payload = {
            id: data.loginId,
            timestamp: new Date()
        }

        const token = jwt.encode(payload, cfg.jwtSecret)
        res.status(200).json({
            error: null,
            data: token
        })
    })
}

module.exports.logOff = (req, res) => {
    user.logOff(req.user.id, req.user.uuid, (error, data) => {
        res.status(error ? 400 : 200).json({error, data})
    })
}
