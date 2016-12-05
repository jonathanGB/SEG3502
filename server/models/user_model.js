const pg = require('pg')
const bcrypt = require('bcrypt');
const cfg = require('../config')
const SALT_ROUNDS = 10;

module.exports.register = (username, unHashedPassword, callback) => {
    bcrypt.hash(unHashedPassword, saltRounds, (err, password) => {
        // store in user db
    })
}

module.exports.findUser = (username, callback) => {
    // find user
}

module.exports.findAllUsers = (callback) => {
  // find all users
}

module.exports.authenticate = (_id, callback) => {
    // authenticate
}

function comparePasswordbyID(_id, password, callback) {
    // user.findOne({_id},
    //     {username: 1, password: 1},(err, docs) => {
    //         if (err || !docs)
    //             return callback(true)
    //         else
    //             bcrypt.compare(password, docs.password, callback)
    //     })
}

module.exports.login = (id, password, type, callback) => {
  if (!['supervisors', 'requesters', 'admins'].includes(type)) {
    return callback('bad type', null)
  }

  var con = new pg.Client(cfg.dbConn)
  con.connect((err) => {
    if (err) {
      console.log("can't connect")
      return callback(err, null)
    }

    con.query(`SELECT * FROM ${type} WHERE loginId = $1 LIMIT 1`, [id], (err, data) => {
      if (err) {
        return callback(err, null)
      }
      con.end()

      bcrypt.compare(password, data.rows[0].password, (err, ok) => {
        err || !ok ? callback(err, null) : callback(null, data.rows[0])
      })
    })
  })
}

module.exports.logOff = (_id, requestedSession, callback) => {
    user.update({_id}, {$pull: {openSessions: requestedSession}}, (err, ok) => {
        callback(err, ok);
    })
}


//POST METHODS
