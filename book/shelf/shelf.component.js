'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('shelf').
  component('shelf', {
    templateUrl: 'shelf/shelf.template.html',
    controller: [
      function ShelfController(Auth, $window) {
        this.message = 'hi there!'
      }
    ]
  });
