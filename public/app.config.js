'use strict';

angular.
  module('beerShelfApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/login', {
          template: '<main-header></main-header><login></login>'
        }).
        when('/users', {
          template: '<main-header></main-header><user-list></user-list>'
        }).
        when('/users/:userId', {
          template: '<user-detail></user-detail>'
        }).
        otherwise('/login');
    }
  ]);
