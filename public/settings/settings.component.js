'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('settings').
  component('settings', {
    templateUrl: 'settings/settings.template.html',
    controller: ['Auth','$window', '$routeParams', 'Brewery',
      function SettingsController(Auth, $window, $routeParams, Brewery) {
        self = this
        self.currentUser = Auth.getCurrentUser()
        if (!self.currentUser) {
          $window.location.href = '#!/logout';
        }

        /** Functions **/
        // Load the users from the database.
        self.loadBreweries = function() {
          Brewery.get(function(response) {
            self.breweries = response
          })
        }
        // Create a new user
        self.createBrewery = function() {
          Brewery.create(self.newBrewery, function(newBrewery) {
            self.breweries.push(newBrewery)
            $('#modal-add-breweries').modal('hide')
          })
        }
        // is 'setting' the current tab?
        self.isActive = function(setting) {
          return setting === self.setting
        }
        /** End of functions **/

        self.setting = $routeParams.setting ? $routeParams.setting : 'breweries'
        self.query = ''
        self.orderBy = 'name'

        if (self.setting === 'breweries') {
          self.loadBreweries()
        }
      }
    ]
  })
