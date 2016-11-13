angular.
  module('core.auth').
  factory('Auth', ['$http',
    function($http) {
      function urlBase64Decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
      }

      function getCurrentUserFromToken() {
        var token = $http.defaults.headers.common['X-Access-Token'];
        var user
        if (typeof token !== 'undefined') {
          var encoded = token.split('.')[1];
          user = JSON.parse(urlBase64Decode(encoded)).attributes;
        }
        return user;
      }

      return {
        // signup: function (data, success, error) {
        //     
        // },
        login: function (data, success, error) {
            $http.post('/api/authenticate', data).success(function (response) {
              if (response) {
                if (!response.success && response.message) {
                  error(response)
                }
                else if (response.success && response.token){
                  $http.defaults.headers.common['X-Access-Token'] = response.token;
                  success();
                }
              }
            }).error(error)
        }
        , getCurrentuser: function() {
          return getCurrentUserFromToken();
        }
        , logout: function () {
          delete $http.defaults.headers.common['X-Access-Token'];
        }
      };
    }
  ]);
