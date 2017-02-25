'use strict'

var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
var config = require('../config')
var AuthenticationUtil = require('../models/util/authenticationUtil.js')

// function generateTokenResponse(userAttributes) {
//   return User.forge(userAttributes).fetch()
//     .then(function(user) {
//       if (!user) {
//         return { success: false, message: 'Authentication failed. User not found.' }
//       } else if (user) {
//         // if user is found and password is right create a token
//         var token = jwt.sign(user, config.secret, { expiresIn: 60 * 60 });

//         // return the information including token as JSON
//         return {
//           success: true,
//           message: 'Enjoy your token!',
//           token: token
//         }
//       }
//     }
//   )
// }

router.route('/authenticate')
  .get(function (req, res) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.params.token || req.headers['x-access-token'];

    // decode token
    if (token) {
      // decrypt the token
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'Failed to authenticate token.'
          })
        } else {
          // if everything is good, update the token and return.
          AuthenticationUtil.generateTokenResponse({id: decoded.id})
            .then(function (responseObject) {
              res.json(responseObject)
            })
        }
      })
    } else {
      // if there is no token return an error
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      })
    }
  })
  .post(function (req, res) {
    if (!req.body.email || !req.body.password) {
      res.json({ success: false, message: 'Authentication failed - invalid request.' })
      return
    }

    AuthenticationUtil.generateTokenResponse({email: req.body.email, password: req.body.password})
      .then(function (responseObject) {
        res.json(responseObject)
      })
  })

// router.use(function(req, res, next) {
// 	// check header or url parameters or post parameters for token
// 	var token = req.body.token || req.params.token || req.headers['x-access-token'];

// 	// decode token
// 	if (token) {
// 		// verifies secret and checks exp
// 		jwt.verify(token, config.secret, function(err, decoded) {
// 			if (err) {
// 				return res.status(403).send({
//     			success: false,
//     			message: 'Failed to authenticate token.'
//     		})
// 			} else {
// 				// if everything is good, save to request for use in other routes
// 				req.decoded = decoded
// 				next()
// 			}
// 		})
// 	} else {
// 		// if there is no token
// 		// return an error
// 		return res.status(403).send({
// 			success: false,
// 			message: 'No token provided.'
// 		})
// 	}
// })

module.exports = router
