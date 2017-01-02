angular.
  module('core.beer').
  factory('Beer', ['$http',
    function($http) {
      return {
        get: function (success, error) {
          $http.get('/api/beers').success(function(response) {
            if (success) success(response)
          }).error(function(response) {
            if (error) error(response)
          })
        },
        create: function (newBeer, success, error) {
          $http.post('/api/beers', newBeer).success(function(response) {
            if (success) {
              if (response && response.data && response.data.id) {
                newBeer.id = response.data.id
                success(newBeer)
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
