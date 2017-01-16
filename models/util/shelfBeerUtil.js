
var ShelfBeer = require('../shelfBeer')
var ShelfBeerAttribute = require('../shelfBeerAttribute')
var ShelfBeerAttributes = require('../shelfBeerAttributes')

exports.saveShelfBeerOnly = function(newItem) {
	if (newItem.id && newItem.id > 0) {
		return ShelfBeer.forge({id: newItem.id})
			.fetch({require: true, withRelated: ['beerAttributes']})
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

exports.saveAttributes = function(attributes) {
	var attributeList = []
	attributes.forEach(function(attribute) {
		attributeList.push({
			//id: attribute.id,
			shelf_attribute_type_id: attribute.shelf_attribute_type_id,
			shelf_beers_id: attribute.shelf_beers_id, 
			value: attribute.value
		})
	})
	return Promise.all(
		ShelfBeerAttributes.forge(attributeList)
		.invokeThen('save'))
}

exports.saveShelfBeer = function(newItem) {
	return exports.saveShelfBeerOnly(newItem)
		.then(function (shelfBeer) {
			var attributes = newItem.beerAttributes
			if (attributes) {
				return exports.saveAttributes(attributes)
			}
		})
    // Promise.all(attributes.invokeThen('save')).then(function() {
    //   // collection models should now be saved...
    // });
    // res.json({error: false, data: {id: shelfBeer.get('id')}})


    // ShelfBeer.forge({id: newItem.id})
    // .fetch({require: true, withRelated: ['beerAttributes']})
    // .then(function (shelfBeer) {
    //   shelfBeer.save({
    //     id: newItem.id,
    //     beer_id: newItem.beer_id,
    //     quantity: newItem.quantity,
    //     size: newItem.size,
    //     vintage: newItem.vintage
    //   })
    //   .then(function (sb) {
}