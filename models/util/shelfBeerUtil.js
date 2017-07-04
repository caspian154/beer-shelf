
var ShelfBeer = require('../shelfBeer')
var ShelfBeerAttribute = require('../shelfBeerAttribute')
var ShelfBeerAttributes = require('../shelfBeerAttributes')

exports.saveShelfBeerOnly = function (newItem) {
  if (newItem.id && newItem.id > 0) {
    return ShelfBeer.forge({ id: newItem.id })
      .fetch({ require: true, withRelated: ['beerAttributes'] })
      .then(function (shelfBeer) {
        return shelfBeer.save({
          id: newItem.id,
          beer_id: newItem.beer_id,
          quantity: newItem.quantity,
          size: newItem.size,
          vintage: newItem.vintage
        })
      })
  }
  else {
    return ShelfBeer
      .forge({
        user_id: newItem.user_id,
        beer_id: newItem.beer_id,
        quantity: newItem.quantity,
        size: newItem.size,
        vintage: newItem.vintage
      })
      .save()
  }
}

exports.saveAttributes = function (attributes, shelfBeerId) {
  return ShelfBeerAttribute
    .where({ shelf_beers_id: shelfBeerId })
    .fetchAll()
    .then(function (existingAttributes) {
      // delete all attributes
      return existingAttributes.invokeThen('destroy')
    })
    .then(function () {
      var attributeList = []
      attributes.forEach(function (attribute) {
        attributeList.push({
          shelf_attribute_type_id: attribute.shelf_attribute_type_id,
          shelf_beers_id: attribute.shelf_beers_id,
          value: attribute.value
        })
      })
      // save all attributes.
      return ShelfBeerAttributes.forge(attributeList)
        .invokeThen('save')
    })
}

exports.saveShelfBeer = function (newItem) {
  return exports.saveShelfBeerOnly(newItem)
    .then(function (shelfBeer) {
      var attributes = newItem.beerAttributes
      if (attributes) {
        return exports.saveAttributes(attributes, shelfBeer.get('id'))
          .then(function (attributes) {
            return shelfBeer
          })
      } else {
        return shelfBeer
      }
    })
}

exports.convertToCSV = function (shelfBeers) {
  var beerShelfHeader = 'brewery,beer,size,quantity,vintage,'
  var attributeTypes = getAttributeTypes(shelfBeers)
  beerShelfHeader += attributeTypes.join(',')
  var beerShelfRows = ''

  // TODO: add attribute columns and values.
  try {
    shelfBeers.forEach(function (shelfBeer) {
      beerShelfRows += prepareCsvField(shelfBeer.related('beer').related('brewery').attributes['name'])
      beerShelfRows += prepareCsvField(shelfBeer.related('beer').attributes['name'])
      beerShelfRows += prepareCsvField(shelfBeer.attributes['size'])
      beerShelfRows += prepareCsvField(shelfBeer.attributes['quantity'])
      beerShelfRows += prepareCsvField(shelfBeer.attributes['vintage'])

      attributeTypes.forEach(function (attributeType) {
        beerShelfRows += prepareCsvField(getAttributeValue(shelfBeer, attributeType))
      })
      beerShelfRows += '\n'
    })
  } catch (e) {
    console.log(e)
  }
  return beerShelfHeader + '\n' + beerShelfRows
}

function prepareCsvField (fieldValue) {
  var newValue = (fieldValue === null) ? '' : fieldValue
  return newValue + ','
}

function getAttributeTypes (shelfBeers) {
  var attributeTypes = []

  shelfBeers.forEach(function (shelfBeer) {
    shelfBeer.related('beerAttributes').forEach(function (attribute) {
      try {
        var attributeType = attribute.related('attributeType').attributes['name']
        if (attributeTypes.indexOf(attributeType) < 0) {
          attributeTypes.push(attributeType)
        }
      } catch (e) {
        console.error('Something went wrong looking for attributes of a beer shelf: ' + e)
      }
    })
  })

  return attributeTypes
}

function getAttributeValue (shelfBeer, attributeType) {
  if (!shelfBeer || !shelfBeer.related('beerAttributes')) {
    return null
  }

  var attributeValue = null
  shelfBeer.related('beerAttributes').forEach(function (attribute) {
    if (attribute.related('attributeType').attributes['name'] === attributeType) {
      attributeValue = attribute.attributes['value']
    }
  })

  return attributeValue
}
