'use strict'
import angular from 'angular'

// Register `phoneList` component, along with its associated controller and template
angular.
  module('component.reviews').
  component('reviews', {
    templateUrl: 'component/reviews/reviews.template.html',
    controller: ['Auth','$location',
      function ReviewsController(Auth, $location) {
        this.currentUser = Auth.getCurrentUser();
        if (!this.currentUser) {
          $location.url('/logout');
        }

      }
    ]
  })
