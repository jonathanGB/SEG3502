const cfg = require('./config');
const jwt = require('jwt-simple');
const user = require('./models/user_model');


module.exports.authenticate = (req, res, next) => {
    var token = req.get('token')
    try {
        var {id, type} = jwt.decode(token, cfg.jwtSecret);
        console.log(id)
        console.log(type)
    }
    catch (e) {
      console.log('noooope')
        return res.redirect('/login')
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

module.exports.authorizedToDelete = (req, res, next) => {
    user.authorizedToDelete(req.body.post, req.user.id, (err, authorized) => {
        if(err) {
            return res.status(500).json({
                error: true,
                data: 'Database Error'
            })
        } else if (!authorized){
            return res.status(401).json({
                error: true,
                data: 'User does not have right to delete this post'
            })
        }
        next()
    })
}
