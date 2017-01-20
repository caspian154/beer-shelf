'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('reviews').
  component('reviews', {
    templateUrl: 'reviews/reviews.template.html',
    controller: ['Auth','$location',
      function ReviewsController(Auth, $location) {
        this.currentUser = Auth.getCurrentUser();
        if (!this.currentUser) {
          $location.url('/logout');
        }

      }
    ]
  });
