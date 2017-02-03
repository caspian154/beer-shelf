exports.USER = 'USER'
exports.ADMIN = 'ADMIN'

exports.validatePermissions = function(req, res, next) {

}


exports.getUserRoles = function(req) {
  	// check header or url parameters or post parameters for token
	var token = req.body.token || req.params.token || req.headers['x-access-token'];

  // we already have the decoded user object.
  if (req.decoded) {
    return req.decoded.roles
  }

	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, config.secret, function(err, decoded) {
			if (err) {
        return []
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded
			}
		})
	} else {
    return []
	}
}