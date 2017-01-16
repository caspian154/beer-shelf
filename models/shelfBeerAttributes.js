'use strict';

let bookshelf = require('../database');
let ShelfBeerAttribute = require('./shelfBeerAttribute')

var ShelfBeers = bookshelf.Collection.extend({  
    model: ShelfBeerAttribute
});

module.exports = ShelfBeers;
