'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('login').
  component('login', {
    templateUrl: 'login/login.template.html',
    controller: ['Auth', '$http', '$window',
      function LoginController(Auth, $http, $window) {
        var self = this;

        self.email = 'srtelle@gmail.com';
        self.password = 'test';

        this.login = function () {
          Auth.query({email: self.email, password: self.password},
            function(data) {
              self.auth = data;
              if (self.auth) {
                if (!self.auth.success && self.auth.message) {
                  self.error = self.auth.message;
                  return;
                }
                else if (self.auth.success && self.auth.token){
                  $http.defaults.headers.common['X-Access-Token'] = self.auth.token;
                  $window.location.href = '#!/users';
                  return;
                }
              }

              self.error = "Something serious went wrong.";
            });
        }
      }
    ]
  });
