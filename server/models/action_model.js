const pg = require('pg')
const async = require('async')
const cfg = require('../config')

exports.findGrantApplication = (id, callback) => {
  var con = new pg.Client(cfg.dbConn)
  con.connect((err) => {
    if (err) {
      return callback(err, null)
    }

    con.query(`SELECT * FROM grantapplication WHERE id = $1`, [id], (err, {rows}) => {
      con.end()

      if (err || rows.length === 0) {
        callback(err, null)
      } else {
        callback(null, rows)
      }
    })
  })
}

exports.getApplications = (type, id, callback) => {
  var baseQuery = `SELECT * FROM grantapplication`
  var params = []

  if (type !== "admins") {
    params.push(id)
  }

  if (type === "requesters") {
    baseQuery += ` WHERE requestId = $1`
  }  else if (type === "supervisors") {
    baseQuery += ` WHERE supervisorId = $1`
  }

  var con = new pg.Client(cfg.dbConn)
  con.connect((err) => {
    if (err) {
      return callback(err, null)
    }

    con.query(baseQuery, params, (err, {rows}) => {
      con.end()

      if (err) {
        callback(err, null)
      } else {
        callback(null, rows)
      }
    })
  })
}

exports.getApplicationAdmin = (id, callback) => {
  callback(true) // temp
  // TODO: get what you need. look at findGrantApplication to know how to query db
}

exports.getApplicationRequester = (id, callback) => {
  callback(true) // temp
  // TODO: get what you need. look at findGrantApplication to know how to query db
}

exports.getApplicationSupervisor = (id, callback) => {
  callback(true) // temp
  // TODO: get what you need. look at findGrantApplication to know how to query db
}

exports.createApplication = (requesterId, supervisorId, callback) => {
  var con = new pg.Client(cfg.dbConn)
  con.connect((err) => {
    if (err) {
      con.end()
      return callback(err, null)
    }

    con.query('BEGIN', (err) => {
      if (err) {
        return rollback(con, callback, err)
      }

      con.query('INSERT INTO grantapplication(requesterId, supervisorId) VALUES ($1, $2) RETURNING id', [requesterId, supervisorId], (err, {rows}) => {
        if (err) {
          return rollback(con, callback, err)
        }

        const appId = rows[0].id

        con.query('INSERT INTO conference(applicationId) VALUES ($1)', [appId], (err) => {
          if (err) {
            return rollback(con, callback, err)
          }

          async.series([
            (cb) => {
              createExpense('inscription', appId, cb)
            },
            (cb) => {
              createExpense('transport', appId, cb)
            },
            (cb) => {
              createExpense('logement', appId, cb)
            },
            (cb) => {
              createExpense('repas', appId, cb)
            }
          ], (err) => {
            if (err) {
              return rollback(con, callback, err)
            }

            con.query('COMMIT', (err) => {
              con.end()
              callback(err, appId)
            })
          })
        })
      })
    })
  })

  function createExpense(description, appId, asyncCb) {
    con.query('INSERT INTO expense(description, requestId) VALUES ($1, $2)', [description, appId], (err) => {
      asyncCb(err)
    })
  }
}

function rollback(client, callback, err) {
  client.query('ABORT', () => {
    client.end()
    callback(err)
  })
}
