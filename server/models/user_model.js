const pg = require('pg')
const bcrypt = require('bcrypt');
const cfg = require('../config')
const SALT_ROUNDS = 10;

module.exports.addAdmin = ({loginId, password}, callback) => {
  if (!loginId || !password) {
    return callback('parameter missing')
  }

  bcrypt.hash(password, SALT_ROUNDS, (err, password) => {
    var con = new pg.Client(cfg.dbConn)
    con.connect((err) => {
      if (err) {
        return callback(err)
      }

      con.query(`INSERT INTO admins(loginId, password) VALUES ($1, $2)`, [loginId, password], (err, data) => {
        con.end()

        callback(err)
      })
    })
  })
}

module.exports.addSupervisor = ({surname, givenName, email, loginId, password, empNumber}, callback) => {
  if (!surname || !givenName || !email || !loginId || !password || !empNumber) {
    return callback('parameter(s) missing')
  }

  bcrypt.hash(password, SALT_ROUNDS, (err, password) => {
    var con = new pg.Client(cfg.dbConn)
    con.connect((err) => {
      if (err) {
        return callback(err)
      }

      con.query(`INSERT INTO supervisors(surname, givenName, email, loginId, password, empNumber) VALUES ($1, $2, $3, $4, $5, $6)`, [surname, givenName, email, loginId, password, empNumber], (err) => {
        con.end()

        callback(err)
      })
    })
  })
}

module.exports.addRequester = ({surname, givenName, email, loginId, password, type, studentNumber, academicUnit, program, sessionNumber, supervisorId, thesisTopic, bankAccountNumber}, callback) => {
  if (!surname || !givenName || !email || !loginId || !password || !type || !studentNumber || !academicUnit || !program || !sessionNumber || !supervisorId || !thesisTopic || !bankAccountNumber) {
    return callback('parameter(s) missing')
  }

  bcrypt.hash(password, SALT_ROUNDS, (err, password) => {
    var con = new pg.Client(cfg.dbConn)
    con.connect((err) => {
      if (err) {
        return callback(err)
      }

      con.query(`INSERT INTO requesters(surname, givenName, email, loginId, password, type, studentNumber, academicUnit, program, sessionNumber, supervisorId, thesisTopic, bankAccountNumber) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`, [surname, givenName, email, loginId, password, type, studentNumber, academicUnit, program, sessionNumber, supervisorId, thesisTopic, bankAccountNumber], (err) => {
        con.end()

        callback(err)
      })
    })
  })
}

module.exports.authenticate = (id, type, callback) => {
  if (!['supervisors', 'requesters', 'admins'].includes(type)) {
    return callback('bad type', null)
  }

  var con = new pg.Client(cfg.dbConn)
  con.connect((err) => {
    if (err) {
      return callback(err, null)
    }

    con.query(`SELECT * FROM ${type} WHERE loginId = $1 LIMIT 1`, [id], (err, {rows}) => {
      con.end()

      err || rows.length === 0 || !rows[0].isloggedin ? callback('not logged in', null) : callback(null, rows[0])
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
      if (err || data.rows.length === 0) {
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
  if (!['supervisors', 'requesters', 'admins'].includes(type)) {
    return callback('bad type', null)
  }

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
