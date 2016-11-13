'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('login').
  component('login', {
    templateUrl: 'login/login.template.html',
    controller: ['Auth', '$window',
      function LoginController(Auth, $window) {
        var self = this;

        function loginSuccess(response) {
          $window.location.href = '#!/users';
        }

        function loginFailure(response) {
          self.error = "Invalid credentials";
        }

        this.login = function () {
          Auth.login({email: self.email, password: self.password}, loginSuccess, loginFailure);
        }

        self.email = 'srtelle@gmail.com';
        self.password = 'test';
      }
    ]
  });
