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



exports.getApplicationRequesterAdmin = (id, callback) => {
  
  var con = new pg.Client(cfg.dbConn)
  con.connect((err) => {
    if (err) {
      return callback(err, null)
    }

    con.query(`select * from grantapplication as G, expense as E, conference as C, geoZone as Ge where G.id = $1 and G.id = E.requestId and E.requestId = C.applicationId` and C.geoZoneName = Ge.name, [id], (err, {rows}) => {
      con.end()

      if (err || rows.length === 0) {
        callback(err, null)
      } else {
        callback(null, rows)
      }
    })
  })
}

exports.getApplicationSupervisor = (id, callback) => {
  
  var con = new pg.Client(cfg.dbConn)
  con.connect((err) => {
    if (err) {
      return callback(err, null)
    }

    con.query(`select E.description, E.amount, G.requestAdvanceFunds, G.recommandations from expense as E, grantapplication as G where G.id = $1 and G.id = E.requestId`, [id], (err, {rows}) => {
      con.end()

      if (err || rows.length === 0) {
        callback(err, null)
      } else {
        callback(null, rows)
      }
    })
  })
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

exports.updateTable = (tableName, id, obj, asyncCb) => {
  var con = new pg.Client(cfg.dbConn)
  con.connect((err) => {
    if (err) {
      con.end()
      return asyncCb(err)
    }

    if (tableName === "grantapplication") {
      con.query('UPDATE grantapplication SET presentationTitle = $1, requestAdvanceFunds = $2, presentationTypeName = $3 WHERE id = $4', [obj.presentationTitle, obj.requestAdvanceFunds, obj.presentationTypeName, id], (err) => {
        con.end()
        console.log('1', err)
        asyncCb(err)
      })
    } else  if (tableName === "expense") {
      async.series([
        (cb) => {
          con.query('UPDATE expense SET amount = $1 WHERE description = $2 AND requestId = $3', [obj.inscription, 'inscription', id], cb)
        },
        (cb) => {
          con.query('UPDATE expense SET amount = $1 WHERE description = $2 AND requestId = $3', [obj.transport, 'transport', id], cb)
        },
        (cb) => {
          con.query('UPDATE expense SET amount = $1 WHERE description = $2 AND requestId = $3', [obj.logement, 'logement', id], cb)
        },
        (cb) => {
          con.query('UPDATE expense SET amount = $1 WHERE description = $2 AND requestId = $3', [obj.repas, 'repas', id], cb)
        }
      ], (err) => {
        con.end()
        console.log('2', err)
        asyncCb(err)
      })
    } else {
      con.query('UPDATE conference SET startDate = $1, endDate = $2, website = $3, location = $4, geoZoneName = $5 WHERE applicationId = $6', [obj.startDate, obj.endDate, obj.website, obj.location, obj.geoZoneName, id], (err) => {
        con.end()
        console.log('3', err)
        asyncCb(err)
      })
    }
  })
}

exports.updateStatus = (id, newStatus, callback) => {
  var con = new pg.Client(cfg.dbConn)
  con.connect((err) => {
    if (err) {
      return callback(err)
    }

    con.query(`UPDATE grantapplication SET status = $1 WHERE id = $2`, [newStatus, id], (err) => {
      con.end()

      callback(err)
    })
  })
}

exports.feedbackApplication = (id, newStatus, recommandation, callback) => {
  var con = new pg.Client(cfg.dbConn)
  con.connect((err) => {
    if (err) {
      return callback(err)
    }

    con.query(`UPDATE grantapplication SET status = $1, recommandations = $2 WHERE id = $3`, [newStatus, recommandation, id], (err) => {
      con.end()

      callback(err)
    })
  })
}

function rollback(client, callback, err) {
  client.query('ABORT', () => {
    client.end()
    callback(err)
  })
}
