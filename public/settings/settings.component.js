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
        // button clicked to open the add brewery window
        self.openAddBrewery = function() {
          self.baSearchString = ""
          self.baList = []
        }
        // Search Beer Advocate
        self.searchBeerAdvocate = function() {
          Brewery.search(self.baSearchString, function(response) {
              self.baList = response
              self.selectBreweries(true)
            },
            function(response) {
              self.addError = response
            })
        }
        // is 'setting' the current tab?
        self.isActive = function(setting) {
          return setting === self.setting
        }
        // select or unselect all the checkboxes
        self.selectBreweries = function(check) {
          angular.forEach(self.baList, function(item) {
            item.checked = check
          })
        }
        // add the selected breweries to the database
        self.addSelectedBreweries = function() {
          angular.forEach(self.baList, function(item) {
            if (item.checked) {
              Brewery.create(item, function() {}, function() {})
            }
          })

          self.loadBreweries()
        }
        /** End of functions **/

        self.setting = $routeParams.setting ? $routeParams.setting : 'breweries'
        self.query = ''
        self.orderBy = 'name'
        self.baList = []

        if (self.setting === 'breweries') {
          self.loadBreweries()
        }
      }
    ]
  })
