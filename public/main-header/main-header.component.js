'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('mainHeader').
  component('mainHeader', {
    templateUrl: 'main-header/main-header.template.html',
    controller: ['Auth',
      function MainHeaderController(Auth) {
        this.user = Auth.getCurrentuser()
      }
    ]
  });
