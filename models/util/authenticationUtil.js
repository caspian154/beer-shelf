
var jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
var User = require('../user')
var config = require('../../config')

exports.USER = 'USER'
exports.ADMIN = 'ADMIN'

/**
 * Validate that a user exists with the roles in the requiredRoles list. If requireRoles is
 * null or empty, simply verify that a user is authenticated.
 */
exports.validatePermissions = function (req, res, next, requiredRoles) {
  var user = exports.getUserFromToken(req)

  if (!user) {
    return res.status(403).send({
      success: false,
      message: 'user must be logged in to use this function'
    })
  }

  if (requiredRoles) {
    var roles = exports.getUserRoles(user)
    for (var i = 0; i < requiredRoles.length; i++) {
      var role = requiredRoles[i]
      if (!roles || !hasRole(roles, role)) {
        return res.status(403).send({
          success: false,
          message: 'The logged in user is missing the required role: ' + role
        })
      }
    }
  }

  next()
}

function hasRole (roles, roleName) {
  for (var i = 0; i < roles.length; i++) {
    if (roles[i].role.name === roleName) {
      return true
    }
  }
  return false
}

exports.getUserRoles = function (user) {
  if (user) {
    return user.roles
  } else {
    return []
  }
}

/**
 * Get the user object from the token in the request
 */
exports.getUserFromToken = function (req) {
  // TODO: we need a promise here...

  // we already have the decoded user object.
  if (req.decoded) {
    return req.decoded
  }

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.params.token || req.headers['x-access-token']

  // decode token
  if (token) {
    // verifies secret and checks exp
    try {
      req.decoded = jwt.verify(token, config.secret)
      return req.decoded
    } catch (err) {
      console.error('Error decoding token: ' + err)
      return null
    }
  } else {
    return null
  }
}

exports.generateTokenResponse = function (userAttributes) {
  return User.forge(userAttributes).fetch({withRelated: ['roles', 'roles.role']})
    .then(function (user) {
      if (!user) {
        return { success: false, message: 'Authentication failed. User not found.' }
      } else if (user) {
        // if user is found and password is right create a token
        var token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 60 * 60 })

        // return the information including token as JSON
        return {
          success: true,
          message: 'Enjoy your token!',
          token: token
        }
      }
    }
  )
}
