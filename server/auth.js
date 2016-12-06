const cfg = require('./config')
const jwt = require('jwt-simple')
const user = require('./models/user_model')
const action = require('./models/action_model')


module.exports.authenticate = (req, res, next) => {
    var token = req.cookies.token
    try {
        var {id, type} = jwt.decode(token, cfg.jwtSecret);
        console.log(id)
        console.log(type)
    }
    catch (e) {
      console.log('noooope')
        return res.redirect('/')
    }

    user.authenticate(id, type, (err, data) => {
        if (err || !data) {
            return res.status(404).json({
                error: true,
                data: 'User not found'
            })
        }

        req.user = {
          data,
          type
        }

        next();
    })
};

module.exports.adminCheck = ({user: {type}}, res, next) => {
  if (type === "admins") {
    next()
  } else {
    res.status(401).json({
      error: 'Reserved to admins'
    })
  }
}

module.exports.requesterCheck = ({user: {type}}, res, next) => {
  console.log('weiiiiird')
  if (type === "requesters") {
    next()
  } else {
    res.status(401).json({
      error: 'Reserved to requesters'
    })
  }
}

module.exports.supervisorCheck = ({user: {type}}, res, next) => {
  if (type === "supervisors") {
    next()
  } else {
    res.status(401).json({
      error: 'Reserved to requesters'
    })
  }
}

module.exports.visibleAppCheck = ({params: {id}, user: {type, data: {loginid, empnumber}}}, res, next) => {
  console.log('kwefoefw', id)
  if (type === "admins") {
    next()
  } else {
    next()
    /*action.findGrantApplication(id, (err, rows) => {
      if (err) {
        return res.status(404).json({
          error: "application not found"
        })
      }

      if (type === "requesters" && loginid === rows[0].requesterid ||
          type === "supervisors" && empnumber === rows[0].supervisorid) {
            next()
      } else {
        res.status(401).json({
          error: "not authorized to see app"
        })
      }
    })*/
  }
}
