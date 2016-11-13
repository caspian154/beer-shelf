'use strict';

var express = require('express');
var app = express();
var router = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var User = require('../models/user')
var config = require('../config')

router.route('/authenticate')
  .post(function (req, res) {
    console.log('authenticate request received.');
    if (!req.body.email || !req.body.password) {
      console.log('Authentication failed - invalid request');
      res.json({ success: false, message: 'Authentication failed - invalid request.' });
      return;
    }

    User.forge({email: req.body.email}).fetch()
    .then(function(user) {
      if (!user) {
        console.log('Authentication failed, User not found.');
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        // check if password matches
        if (user.get("password") != req.body.password) {

          res.json({ success: false, message: 'Authentication failed. Wrong password'});
        } else {

          // if user is found and password is right create a token
          var token = jwt.sign(user, config.secret, { expiresIn: 60 * 60 });

          console.log('Authentication success');
          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    });
  });

router.use(function(req, res, next) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.params.token || req.headers['x-access-token'];

	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, config.secret, function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});
	} else {
		// if there is no token
		// return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
});

module.exports = router;
