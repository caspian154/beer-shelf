'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('beerShelfApp').
  component('mainHeader', {
    templateUrl: 'main-header.template.html',
    controller: ['Auth',
      function MainHeaderController(Auth) {
        this.auth = Auth
      }
    ]
  });
