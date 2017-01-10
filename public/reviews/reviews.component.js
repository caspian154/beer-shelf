'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('reviews').
  component('reviews', {
    templateUrl: 'reviews/reviews.template.html',
    controller: ['Auth','$window',
      function ReviewsController(Auth, $window) {
        this.currentUser = Auth.getCurrentUser();
        if (!this.currentUser) {
          $window.location.href = '/logout';
        }

      }
    ]
  });
