'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('shelf').
  component('shelf', {
    templateUrl: 'shelf/shelf.template.html',
    controller: ['Auth','$location', 'ShelfBeer', 'Beer', '$filter',
      function ShelfController(Auth, $location, ShelfBeer, Beer, $filter) {
        self = this
        self.currentUser = Auth.getCurrentUser();
        if (!self.currentUser) {
          $location.url('/logout');
        }

        /** Functions **/
        // Load the beers from the database.
        self.loadShelfBeers = function() {
          ShelfBeer.get(self.currentUser.id, function(response) {
            self.shelfBeers = response
          })
        }
        // load the database of beers.
        self.loadBeerDb = function() {
          Beer.getAutocomplete(function(response) {
            self.beerDb = response
          })
        }
        // load all the attribute types 
        self.loadAttributeTypes = function () {
          ShelfBeer.getAttributeTypes(function(response) {
            self.shelfAttributeTypes = response
          })
        }
        // return a list of available attribute types
        self.getAttributeTypes = function () {
          return self.shelfAttributeTypes
        }
        // callback for closing the edit beer window
        self.closeAddBeerModal = function() {
          self.loadShelfBeers()
          $('#modal-add-beer').modal('hide')
        }
        // add this beer to the shelf
        self.addBeerToShelf = function() {
          if (self.newBeer) {
            self.newBeer.user_id = self.currentUser.id
            self.newBeer.beer_id = self.newBeerSelection.id

            // if this beer already has an id, we're updating not creating
            if (self.newBeer.id) {
              ShelfBeer.update(self.newBeer, self.closeAddBeerModal, function() {})
            }
            else {
              ShelfBeer.create(self.newBeer, self.closeAddBeerModal, function() {})
            }
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
            self.newBeer = { 
              'id' : shelfBeer.id, 
              'quantity' : shelfBeer.quantity, 
              'vintage' : shelfBeer.vintage,
              'beerAttributes' : shelfBeer.beerAttributes
            }

            $('#modal-add-beer').modal('show')
          }
        }
        // add attribute to the beer being modified
        self.addShelfBeerAttribute = function(attributeType) {
          if (self.newBeer) {
            if (!self.newBeer.beerAttributes) {
              self.newBeer.beerAttributes = []
            }

            self.newBeer.beerAttributes.push({
              shelf_attribute_type_id: attributeType.id,
              shelf_beers_id: self.newBeer.id,
              'value': '',
              attributeType: attributeType
            })
          }
        }
        // remove the attribute from this beer
        self.removeShelfBeerAttribute = function(attribute) {
          if (self.newBeer && self.newBeer.beerAttributes) {
            self.newBeer.beerAttributes.pop(attribute)
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
        self.loadBeerDb()
        self.loadShelfBeers()
        self.loadAttributeTypes()
      }
    ]
  });
