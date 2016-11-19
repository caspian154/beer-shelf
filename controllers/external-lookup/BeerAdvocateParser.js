'use strict';

var https = require('https');

// Constructor
function BeerAdvocateParser() {
}

// class methods
BeerAdvocateParser.prototype.lookupBreweries = function(searchText) {

  var url ='https://www.beeradvocate.com/search/?q=' + searchText + '&qt=place'
  console.log('URL IS ' + url)

  https.get(url, function(res) {
    let rawData = '';

    /** TODO: pretty up this stuff and process the end response **/
    res.on('data', (chunk) => {
      rawData += chunk
      console.log('data...')
    });
    res.on('end', () => {
      try {
        console.log('got to the end...')
        console.log(rawData);
      } catch (e) {
        console.log(e.message);
      }
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });

  return {
    'message': 'you searched for ['+ searchText + ']'
  }
};

// export the class
module.exports = new BeerAdvocateParser();
