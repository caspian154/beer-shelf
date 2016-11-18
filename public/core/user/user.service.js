angular.
  module('core.user').
  factory('User', ['$http',
    function($http) {
      return {
        get: function (success, error) {
          $http.get('/api/users').success(function(response) {
            if (success) success(response)
          }).error(function(response) {
            if (error) error(response)
          })
        }
        ,create: function (newUser, success, error) {
          $http.post('/api/users', newUser).success(function(response) {
            if (success) {
              if (response && response.data && response.data.id) {
                newUser.id = response.data.id
                success(newUser)
                return
              }
            }
            error(response)
          }).error(function(response) {
            if (error) error(response)
          })
        }
      }
    }
  ]);
