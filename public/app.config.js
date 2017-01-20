'use strict';

angular.module('beerShelfApp').controller('YourController', ['$scope', 'session', '$location',
    function($scope, session, $location) {

        $scope.$on('$routeChangeStart', function(angularEvent, newUrl) {

            if (newUrl.requireAuth && !session.user) {
                // User isn’t authenticated
                $location.path("/login");
            }

        });
    }
]);

angular.
  module('beerShelfApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.html5Mode(true);

      $routeProvider
        .when('/login', {
          template: '<main-header></main-header><login></login>'
        })
        .when('/logout', {
          template: "",
          controller: ['Auth', '$location',
            function LogoutController(Auth, $location) {
              Auth.logout();
              $location.url('/login');
            }
          ]
        })
        .when('/account', {
          template: '<main-header></main-header><account></account>'
        })
        .when('/users', {
          template: '<main-header></main-header><user-list></user-list>'
        })
        .when('/users/:userId', {
          template: '<user-detail></user-detail>'
        })
        .when('/shelf', {
          template: '<main-header></main-header><shelf></shelf>'
        })
        .when('/reviews', {
          template: '<main-header></main-header><reviews></reviews>'
        })
        .when('/settings/:setting?', {
          template: '<main-header></main-header><settings></settings>'
        })
        .otherwise('/login');
    }
  ]);
