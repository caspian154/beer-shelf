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
          var user = Auth.getCurrentUser()
          if (user.reset_password_flag) {
            $window.location.href = '#!/account'
          }
          else {
            $window.location.href = '#!/shelf';
          }
        }

        function loginFailure(response) {
          self.error = "Invalid credentials";
        }

        this.login = function () {
          Auth.login({email: self.email, password: self.password}, loginSuccess, loginFailure);
        }

        self.email = 'admin@beershelf.com';
        self.password = 'admin';
      }
    ]
  });
