'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('mainHeader').
  component('mainHeader', {
    templateUrl: 'main-header/main-header.template.html',
    controller: function MainHeaderController() {
        //this.users = User.query();
        //this.orderProp = 'name';
        this.name = 'Scott Telle'
      }
  });
