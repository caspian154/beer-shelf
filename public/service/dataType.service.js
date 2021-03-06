import angular from 'angular'

angular.module('service.dataType', ['ngResource'])
  .factory('DataType', ['$http',
    function($http) {
      return {
        get: function (success, error) {
          $http.get('/api/data-type').success(function(response) {
            if (success) success(response)
          }).error(function(response) {
            if (error) error(response)
          })
        }
      }
    }
  ]);
