'use strict'

var https = require('https')
var cheerio = require('cheerio')
var S = require('string')

/** Parse the page returned from BA **/
function parseBreweryHtml (html, searchText) {
  var $ = cheerio.load(html)
  var results = []

  $('a').each(function (i, elem) {
    var link = $(elem)
    if (link.attr('href') && S(link.attr('href')).startsWith('/beer/profile')) {
      var name = S($(link.html()).html()).decodeHTMLEntities().s
      var id = link.attr('href')
      id = S(id).chompLeft('/beer/profile/').chompRight('/').s
      results.push({beer_advocate_id: id, name: name})
    }
  })

  return results
}

function parseBeerHtml (html, breweryId) {
  var $ = cheerio.load(html)
  var results = []

  console.log('parsing the html')

  $('tr').each(function (i, elem) {
    var cells = $(elem).find('td.hr_bottom_light')
    if (cells && cells.length > 2) {
      var beer = {}

      // get the beer name
      beer.name = S($(cells[0]).find('a b').html()).decodeHTMLEntities().s

      // get the beer advocate id
      beer.beer_advocate_id = S($(cells[0]).find('a').attr('href'))
        .chompLeft('/beer/profile/' + breweryId + '/')
        .chompRight('/').s
      beer.abv = $(cells[2]).find('span').html()
      beer.style = S($(cells[1]).find('a').html()).decodeHTMLEntities().s
      beer.brewery_id = breweryId

      results.push(beer)
    } else {
      console.log('not a beer...')
    }
  })

  return results
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
        callback(parseBreweryHtml(rawData))
      } catch (e) {
        errorCallback(e.message)
      }
    });
  }).on('error', function(e) {
    errorCallback(e.message)
  });
}

exports.lookupBeers = function(breweryId, callback, errorCallback) {
  var self = this
  var url ='https://www.beeradvocate.com/beer/profile/' + breweryId + '/'

  https.get(url, function(res) {
    let rawData = '';

    res.on('data', (chunk) => {
      rawData += chunk
    });
    res.on('end', () => {
      try {
        callback(parseBeerHtml(rawData, breweryId))
      } catch (e) {
        errorCallback(e.message)
      }
    });
  }).on('error', function(e) {
    errorCallback(e.message)
  });
}
