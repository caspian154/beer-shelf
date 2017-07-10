'use strict'
import angular from 'angular'

angular
  .module('component.shelf')
  .component('shelf', {
    templateUrl: 'component/shelf/shelf.template.html',
    controller: ['Auth', '$location', 'ShelfBeer', 'Beer', 'DataType', '$filter', 'Upload', '$timeout',
      function (Auth, $location, ShelfBeer, Beer, DataType, $filter, Upload, $timeout) {
        var self = this
        self.currentUser = Auth.getCurrentUser()
        if (!self.currentUser) {
          $location.url('/logout')
        }

        /** Functions **/
        // handle import click
        self.uploadImport = function (file, errFiles) {
          self.import.file = file
          self.import.errFile = errFiles && errFiles[0]
          if (file) {
            file.upload = Upload.upload({
              url: '/api/shelf-beers/user/' + self.currentUser.id + '/import',
              data: { shelfCsvFile: file }
            })

            file.upload.then(function (response) {
              $timeout(function () {
                if (response.data && response.data.headers) {
                  self.import.headers = response.data.headers
                  self.import.data = response.data.data
                  $('#modal-import').modal('show')
                }
              })
            }, function (response) {
              if (response.status > 0) {
                console.error(response.status + ': ' + response.data)
              }
            }, function (evt) {
              self.import.file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total))
            })
          }
        }
        // Load the beers from the database.
        self.loadShelfBeers = function () {
          ShelfBeer.get(self.currentUser.id, function (response) {
            self.shelfBeers = response
          })
        }
        // load the database of beers.
        self.loadBeerDb = function () {
          Beer.getAutocomplete(function (response) {
            self.beerDb = response
          })
        }
        // load all the attribute types 
        self.loadAttributeTypes = function () {
          ShelfBeer.getAttributeTypes(function (response) {
            self.shelfAttributeTypes = response
          })
        }
        // return a list of available attribute types
        self.getAttributeTypes = function () {
          return self.shelfAttributeTypes
        }
        // load all the attribute data types 
        self.loadAttributeDataTypes = function () {
          DataType.get(function (response) {
            self.attributeDataTypes = response
          })
        }
        // callback for closing the edit beer window
        self.closeAddBeerModal = function () {
          self.loadShelfBeers()
          $('#modal-add-beer').modal('hide')
        }
        // add this beer to the shelf
        self.addBeerToShelf = function () {
          if (self.newBeer) {
            self.newBeer.user_id = self.currentUser.id
            self.newBeer.beer_id = self.newBeerSelection.id

            // if this beer already has an id, we're updating not creating
            if (self.newBeer.id) {
              ShelfBeer.update(self.newBeer, self.closeAddBeerModal, function () { })
            }
            else {
              ShelfBeer.create(self.newBeer, self.closeAddBeerModal, function () { })
            }
          }
        }
        // button clicked to open the add brewery window
        self.openAddBeer = function () {
          self.editingBeer = false
          delete self.newBeerSelection
          self.newBeer = {}
        }
        // edit item clicked
        self.openEditBeer = function (shelfBeer) {
          if (shelfBeer) {
            self.newBeerSelection = $filter('filter')(self.beerDb, { id: shelfBeer.beer.id })[0]
            self.newBeer = {
              'id': shelfBeer.id,
              'quantity': shelfBeer.quantity,
              'vintage': shelfBeer.vintage,
              'beerAttributes': angular.copy(shelfBeer.beerAttributes)
            }

            $('#modal-add-beer').modal('show')
          }
        }
        // delete the item clicked
        self.deleteBeer = function (shelfBeer) {
          ShelfBeer.delete(shelfBeer.id, function () { self.loadShelfBeers() })
        }
        // add attribute to the beer being modified
        self.addShelfBeerAttribute = function (attributeType) {
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
        self.removeShelfBeerAttribute = function (attribute) {
          if (self.newBeer && self.newBeer.beerAttributes) {
            self.newBeer.beerAttributes.pop(attribute)
          }
        }
        // callback for closing the add Attribute window
        self.cloaseAddNewAttributeModal = function () {
          self.loadAttributeTypes()
          $('#modal-new-attribute').modal('hide')
        }
        // add this beer to the shelf
        self.addNewAttribute = function () {
          if (self.newAttribute) {
            ShelfBeer.createAttributeType(
              self.newAttribute,
              self.cloaseAddNewAttributeModal,
              function () { })
          }
        }
        // button clicked to open the add brewery window
        self.openAddNewAttribute = function () {
          self.newAttribute = {}
        }
        // update the sort by
        self.sortBy = function (orderBy) {
          self.reverse = (self.orderBy === orderBy) ? !self.reverse : false;
          self.orderBy = orderBy;
        }
        /** End of functions **/

        self.query = ''
        self.orderBy = 'name'
        self.reverse = false
        self.import = {}
        self.loadBeerDb()
        self.loadShelfBeers()
        self.loadAttributeTypes()
        self.loadAttributeDataTypes()
      }
    ]
  })
