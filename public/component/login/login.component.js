'use strict'
import angular from 'angular'

// Register `phoneList` component, along with its associated controller and template
angular.module('component.login').component('login', {
    templateUrl: 'component/login/login.template.html',
    controller: ['Auth', '$location',
      function LoginController(Auth, $location) {
        var self = this;
        self.loginSuccess = loginSuccess;
        self.loginFailure = loginFailure;
        if (Auth.getCurrentUser()) {
          $location.url('/shelf');
        }

        function loginSuccess(response) {
          var user = Auth.getCurrentUser()
          if (user.reset_password_flag) {
            $location.url('/account')
          }
          else {
            $location.url('/shelf')
          }
        }

        function loginFailure(response) {
          if (response.message) {
            self.error = response.message
          }
          else {
            self.error = "Invalid credentials";
          }
        }

        this.login = function () {
          Auth.login({email: self.email, password: self.password}, self.loginSuccess, self.loginFailure);
        }
      }
    ]
  });
