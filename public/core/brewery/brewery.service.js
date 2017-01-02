angular.
  module('core.brewery').
  factory('Brewery', ['$http',
    function($http) {
      return {
        get: function (success, error) {
          $http.get('/api/breweries').success(function(response) {
            if (success) success(response)
          }).error(function(response) {
            if (error) error(response)
          })
        },
        create: function (newBrewery, success, error) {
          $http.post('/api/breweries', newBrewery).success(function(response) {
            if (success) {
              if (response && response.data && response.data.id) {
                newBrewery.id = response.data.id
                success(newBrewery)
                return
              }
            }
            error(response)
          }).error(function(response) {
            if (error) error(response)
          })
        },
        search: function (searchString, success, error) {
          if (searchString) {
            $http.get('/api/external-breweries/' + searchString).success(function(response) {
              if (success) {
                if (response && response.data) {
                  success(response.data)
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
    }
  ]);
