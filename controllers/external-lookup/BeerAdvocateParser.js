'use strict'

var https = require('https')
var cheerio = require('cheerio')
var S = require('string')

/** Parse the page returned from BA **/
function parseHtml(html, searchText) {
  var $ = cheerio.load(html)
  var results = [];

  $('a').each(function(i, elem) {
    var link = $(elem);
    if (link.attr('href') && S(link.attr('href')).startsWith('/beer/profile') ) {
      results.push({url: link.attr('href'), name: link.html()})
    }
  });

  return results;
}

/** Function to lookup breweries based on a search string **/
exports.lookupBreweries = function(searchText, callback, errorCallback) {
  var self = this
  var url ='https://www.beeradvocate.com/search/?q=' + searchText + '&qt=place'

  https.get(url, function(res) {
    let rawData = '';

    res.on('data', (chunk) => {
      rawData += chunk
    });
    res.on('end', () => {
      try {
        callback(parseHtml(rawData))
      } catch (e) {
        errorCallback(e.message)
      }
    });
  }).on('error', function(e) {
    errorCallback(e.message)
  });
}
