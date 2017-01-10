'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('userList').
  component('userList', {
    templateUrl: 'user-list/user-list.template.html',
    controller: ['User', 'Auth','$window',
      function UserListController(User, Auth, $window) {
        var self = this;

        /** Functions **/
        // Load the users from the database.
        this.loadUsers = function() {
          User.get(function(response) {
            self.users = response
          })
        }

        // Create a new user
        this.createUser = function() {
          User.create(self.newUser, function(newUser) {
            self.users.push(newUser)
            $('#modal-add-user').modal('hide')
          })
        }
        /** End of functions **/

        this.currentUser = Auth.getCurrentUser();
        if (!this.currentUser) {
          $window.location.href = '/logout';
        }

        this.loadUsers();
        this.orderProp = 'name'
        this.newUser = {
          email: 'test@test.com',
          password: 'test123',
          name: 'Test User',
          reset_password_flag: true
        }
      }
    ]
  });
