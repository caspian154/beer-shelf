import angular from 'angular'

angular.module('service.auth', [])
  .factory('Auth', ['$http',
    function($http) {
      // Helper function to decode the token
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

      // Helper function to get the user from the token
      function getCurrentUserFromToken() {
        var token = $http.defaults.headers.common['X-Access-Token'];
        if (!token) {
          token = $http.defaults.headers.common['X-Access-Token'] = window.sessionStorage["userInfo"]
        }
        var user
        if (typeof token !== 'undefined') {
          var encoded = token.split('.')[1];
          user = JSON.parse(urlBase64Decode(encoded))
        }
        return user;
      }

      return {
        // perform the login functionality
        login: function (data, success, error) {
            $http.post('/api/authenticate', data)
            .then(function (response) {
              if (response && response.data) {
                if (!response.data.success && response.data.message) {
                  error(response.data)
                }
                else if (response.data.success && response.data.token){
                  $http.defaults.headers.common['X-Access-Token'] = response.token;
                  window.sessionStorage["userInfo"] = response.data.token
                  success();
                }
              }
            }, function (response) {
              error(response.data);
            });
        }
        // get the current user from the token
        , getCurrentUser: function() {
          return getCurrentUserFromToken();
        }
        // delete the token objects
        , logout: function () {
          delete $http.defaults.headers.common['X-Access-Token'];
          delete window.sessionStorage["userInfo"];
        }
        
        ,
        /** 
         * Update the user token - use this if there has been some change to the user object 
         */ 
        updateUser: function(success, error) {
            $http.get('/api/authenticate').success(function (response) {
              if (response) {
                if (!response.success && response.message) {
                  error(response)
                }
                else if (response.success && response.token){
                  $http.defaults.headers.common['X-Access-Token'] = response.token;
                  window.sessionStorage["userInfo"] = response.token
                  success();
                }
              }
            }).error(error)
        }
      };
    }
  ]);
