'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('userList').
  component('userList', {
    templateUrl: 'user-list/user-list.template.html',
    controller: ['User', 'Auth','$window',
      function UserListController(User, Auth, $window) {
        var self = this;
        this.currentUser = Auth.getCurrentUser();
        if (!this.currentUser) {
          $window.location.href = '#!/logout';
        }

        User.get(function(response) {
          self.users = response
        })
        this.orderProp = 'name'
        this.newUser = {
          email: 'test@test.com',
          password: 'test123',
          name: 'Test User'
        }

        this.createUser = function() {
          console.log("Create a new user " + self.newUser.name)
          User.create(self.newUser)
        }
      }
    ]
  });
