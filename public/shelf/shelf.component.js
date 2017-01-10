'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('shelf').
  component('shelf', {
    templateUrl: 'shelf/shelf.template.html',
    controller: ['Auth','$window', 'ShelfBeer', 'Beer', '$filter',
      function ShelfController(Auth, $window, ShelfBeer, Beer, $filter) {
        self = this
        self.currentUser = Auth.getCurrentUser();
        if (!self.currentUser) {
          $window.location.href = '/logout';
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

            // if this beer already has an id, we're updating not creating
            if (self.newBeer.id) {
              ShelfBeer.update(self.newBeer, function() {}, function() {})
            }
            else {
              ShelfBeer.create(self.newBeer, function() {}, function() {})
            }

            self.loadShelfBeers()
            $('#modal-add-beer').modal('hide')
          }
        }
        // button clicked to open the add brewery window
        self.openAddBeer = function() {
          self.editingBeer = false
          delete self.newBeerSelection
          self.newBeer = {}
        }
        // edit item clicked
        self.openEditBeer = function(shelfBeer) {
          if (shelfBeer) {
            self.newBeerSelection = $filter('filter')(self.beerDb, function (d) {return d.id === shelfBeer.beer.id;})[0]
            self.newBeer = { 'id' : shelfBeer.id, 'quantity' : shelfBeer.quantity, 'vintage' : shelfBeer.vintage }
            $('#modal-add-beer').modal('show')
          }
        }
        // update the sort by
        self.sortBy = function(orderBy) {
          self.reverse = (self.orderBy === orderBy) ? !self.reverse : false;
          self.orderBy = orderBy;
        }
        /** End of functions **/

        self.query = ''
        self.orderBy = 'name'
        self.reverse = false
        self.shelfBeers = []
        self.loadBeerDb()
        self.loadShelfBeers()
      }
    ]
  });
