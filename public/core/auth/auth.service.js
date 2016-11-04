angular.
  module('core.auth').
  factory('Auth', ['$resource',
    function($resource, email, password) {
      return $resource('api/authenticate', {email: email, password: password}, {
        query: {
          method: 'POST',
          params: { email: email, password: password }
        }
      });
    }
  ]);
