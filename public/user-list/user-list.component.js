'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('userList').
  component('userList', {
    templateUrl: 'user-list/user-list.template.html',
    controller: ['User', 'Auth','$window',
      function UserListController(User, Auth, $window) {
        this.currentUser = Auth.getCurrentUser();
        if (!this.currentUser) {
          $window.location.href = '#!/logout';
        }

        this.users = User.query();
        this.orderProp = 'name';
      }
    ]
  });
