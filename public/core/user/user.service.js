angular.
  module('core.user').
  factory('User', ['$resource',
    function($resource) {
      return $resource('api/users/:userId', {}, {
        query: {
          method: 'GET',
          params: { userId: '' },
          isArray: true
        }
      });
    }
  ]);
