'use strict'
import angular from 'angular'

angular.
  module('component.userList').
  component('userList', {
    templateUrl: 'component/user-list/user-list.template.html',
    controller: ['User', 'Auth','$location',
      function UserListController(User, Auth, $location) {
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
          $location('/logout');
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
