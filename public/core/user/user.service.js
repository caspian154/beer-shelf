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
        , create: function (data, success, error) {
          $http.post('/api/users', data).success(function(response) {
            if (success) success(response)
          }).error(function(response) {
            if (error) error(response)
          })
        }
      }


      // return $resource('api/users/:userId', {}, {
      //   query: {
      //     method: 'GET',
      //     params: { userId: '' },
      //     isArray: true
      //   }
      // });
    }
  ]);
