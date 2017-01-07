'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('settings').
  component('settings', {
    templateUrl: 'settings/settings.template.html',
    controller: ['Auth','$window', '$routeParams', 'Brewery', 'Beer',
      function SettingsController(Auth, $window, $routeParams, Brewery, Beer) {
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
        self.loadBeers = function() {
          Beer.get(function(response) {
            self.beers = response
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
          $('#modal-add-breweries').modal('hide')
        }
        // update the sort by
        self.sortBy = function(orderBy) {
          self.reverse = (self.orderBy === orderBy) ? !self.reverse : false;
          self.orderBy = orderBy;
        };
        /** End of functions **/

        self.setting = $routeParams.setting ? $routeParams.setting : 'breweries'
        self.query = ''
        self.orderBy = 'name'
        self.reverse = false
        self.baList = []

        if (self.setting === 'breweries') {
          self.loadBreweries()
        }
        else if (self.setting  === 'beers') {
          self.loadBeers()
        }
      }
    ]
  })
