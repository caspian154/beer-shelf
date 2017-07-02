'use strict'
import angular from 'angular'

// Register `phoneList` component, along with its associated controller and template
angular.
  module('component.mainHeader').
  component('mainHeader', {
    templateUrl: 'component/main-header/main-header.template.html',
    controller: ['Auth', '$location',
    function MainHeaderController(Auth, $location) {
        this.user = Auth.getCurrentUser()

        this.isActive = function (loc) {
          return $location.path().startsWith(loc)
        }
      }
    ]
  });
