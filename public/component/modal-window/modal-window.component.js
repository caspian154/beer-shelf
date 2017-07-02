'use strict';
import angular from 'angular'

// Register `phoneList` component, along with its associated controller and template
angular.
  module('component.modalWindow').
  component('modalWindow', {
    transclude: true,
    templateUrl: 'component/modal-window/modal-window.template.html',
    bindings: {
      hideModalButtons: "<",
      modalId: "@",
      modalTitle: "@",
      modalFocus: "@"
    },
    controller: ['$timeout',
      function ShelfController($timeout) {
        var self = this


        /** Functions **/
        // set the focus to the value specified in modalFocus
        self.setFocus = function() {
          if (self.modalFocus) {
            $("#" + self.modalFocus).focus()
          }
        }
        /** End of Functions **/

        // Set callback on modal to call setfocus when the "shown" event fires
        $timeout(function () {
           $("#" + self.modalId).on('shown.bs.modal', function (e) {
             self.setFocus()
           })
        }, 500)
      }]
  });
