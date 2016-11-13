'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('shelf').
  component('shelf', {
    templateUrl: 'shelf/shelf.template.html',
    controller: ['Auth','$window',
      function UserListController(Auth, $window) {
        this.currentUser = Auth.getCurrentUser();
        if (!this.currentUser) {
          $window.location.href = '#!/logout';
        }

      }
    ]
  });
