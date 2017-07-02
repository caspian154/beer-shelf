import angular from 'angular'

angular.module('service', ['service.user', 'service.shelfBeer'])

require('./auth.service')
require('./beer.service')
require('./brewery.service')
require('./dataType.service')
require('./shelfBeer.service')
require('./user.service')
