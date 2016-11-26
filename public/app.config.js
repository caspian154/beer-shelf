'use strict';

angular.
  module('beerShelfApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $routeProvider
        .when('/login', {
          template: '<login></login>'
        })
        .when('/logout', {
          template: "",
          controller: ['Auth', '$window',
            function LogoutController(Auth, $window) {
              Auth.logout();
              $window.location.href = '#!/login';
            }
          ]
        })
        .when('/users', {
          template: '<user-list></user-list>'
        })
        .when('/users/:userId', {
          template: '<user-detail></user-detail>'
        })
        .when('/shelf', {
          template: '<shelf></shelf>'
        })
        .when('/settings', {
          template: '<settings></settings>'
        })
        .when('/test', {
          template: '<div>made a test work {{test}}...</div>',
          controller: 'TestController'
        })
        .otherwise('/shelf');

        $locationProvider.hashPrefix('!');
    }
  ])
  .controller('BeerShelfController', ['$scope','$location', 'Auth',
    function MainCtrl($scope, $location, Auth) {
      this.$location = $location;
      this.Auth = Auth;
      $scope.isActive = function (loc) {
        return $location.path().startsWith(loc)
      }
  }])
  .controller('TestController', function BeerShelfController($scope, $location) {
    $scope.test = 'blah blah blah';
  })
