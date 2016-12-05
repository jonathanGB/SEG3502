const user = require('../models/user_model');
const post = require('../models/action_model');
const utils = require('../utils/util');
const qs = require('querystring');

exports.index = (req, res) => {
  res.status(203).json(req.user)
  // render according to user and type
}

exports.addPosts = (req, res) => {
    var userID = req.user.id;
    post.addPosts(req.body.description, req.body.url, req.body.tags, function (err, data) {
        if(err)
            return res.status(400).json({error: true, data: null})
        user.linkPosts(userID, data, function (err, data) {
            res.status(err ? 404 : 200).json({
                error: err,
                data: data
            });
        });
    });
}