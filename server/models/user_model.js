const pg = require('pg')
const bcrypt = require('bcrypt');
const uuid = require('uuid');
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

module.exports.login = (username, password, callback) => {
    // user.findOne({username},
    //     {username: 1, password: 1},(err, docs) => {
    //         if (err || !docs)
    //             return callback(true)
    //         else
    //             bcrypt.compare(password, docs.password,  (username, password, (err, ok) => {
    //                 if (ok) {
    //                     var res = {}
    //                     res.id = docs._id
    //                     res.uuid = uuid.v4()
    //                     user.update({username}, {$push: {"openSessions": res.uuid}}, (err, ok) => {
    //                         if (err || !ok)
    //                             return callback(true, "Please log in again")
    //                         else {
    //                             return callback(err, res)
    //                         }
    //                     })
    //                 } else
    //                     callback(true)
    //             }))
    //     })

}

module.exports.logOff = (_id, requestedSession, callback) => {
    user.update({_id}, {$pull: {openSessions: requestedSession}}, (err, ok) => {
        callback(err, ok);
    })
}


//POST METHODS
