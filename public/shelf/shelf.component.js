'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('shelf').
  component('shelf', {
    templateUrl: 'shelf/shelf.template.html',
    controller: ['Auth','$window', 'ShelfBeer', 'Beer',
      function ShelfController(Auth, $window, ShelfBeer, Beer) {
        self = this
        this.currentUser = Auth.getCurrentUser();
        if (!this.currentUser) {
          $window.location.href = '#!/logout';
        }

        /** Functions **/
        // Load the beers from the database.
        self.loadShelfBeers = function() {
          ShelfBeer.get(self.currentUser.id, function(response) {
            self.shelfBeers = response
          })
        }
        self.loadBeerDb = function() {
          Beer.getAutocomplete(function(response) {
            self.beerDb = response
          })
        }
        // add this beer to the shelf
        self.addBeerToShelf = function() {
          if (self.newBeer) {
            self.newBeer.user_id = self.currentUser.id
            self.newBeer.beer_id = self.newBeerSelection.id
            ShelfBeer.create(self.newBeer, function() {}, function() {})

            self.loadShelfBeers()
          }
        }
        // button clicked to open the add brewery window
        self.openAddBeer = function() {
          self.newBeer = {}
        }
        // update the sort by
        self.sortBy = function(orderBy) {
          self.reverse = (self.orderBy === orderBy) ? !self.reverse : false;
          self.orderBy = orderBy;
        }
        /** End of functions **/

        self.loadBeerDb()

        self.query = ''
        self.orderBy = 'name'
        self.reverse = false
        self.shelfBeers = []
        self.loadShelfBeers()
      }
    ]
  });
