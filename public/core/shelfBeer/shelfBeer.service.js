angular.
  module('core.shelfBeer').
  factory('ShelfBeer', ['$http',
    function($http) {
      return {
        get: function (userId, success, error) {
          $http.get('/api/shelf-beers/' + userId).success(function(response) {
            if (success) success(response)
          }).error(function(response) {
            if (error) error(response)
          })
        },
        create: function (beer, success, error) {
          $http.post('/api/shelf-beers', beer).success(function(response) {
            if (success) {
              if (response && response.data && response.data.id) {
                beer.id = response.data.id
                success(beer)
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
