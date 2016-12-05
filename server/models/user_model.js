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

module.exports.authenticate = (id, type, callback) => {
  var con = new pg.Client(cfg.dbConn)
  con.connect((err) => {
    if (err) {
      return callback(err, null)
    }

    con.query(`SELECT * FROM ${type} WHERE loginId = $1 LIMIT 1`, [id], (err, {rows}) => {
      con.end()

      err || !rows || !rows[0].isloggedin ? callback('not logged in', null) : callback(null, rows[0])
    })
  })
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

      bcrypt.compare(password, data.rows[0].password, (err, ok) => {
        if (err || !ok) {
          callback(err, null)
        } else {
          con.query(`UPDATE ${type} SET isLoggedIn = $1 WHERE loginId = $2`, [true, id], (err) => {
            err ? callback(err, null) : callback(null, data.rows[0])
          })
        }
      })
    })
  })
}

module.exports.logOff = (id, type, callback) => {
  var con = new pg.Client(cfg.dbConn)
  con.connect((err) => {
    if (err) {
      return callback(err, null)
    }

    con.query(`UPDATE ${type} SET isLoggedIn = $1 WHERE loginId = $2`, [false, id], (err) => {
      err ? callback(err, null) : callback(null)
    })
  })
}


//POST METHODS
