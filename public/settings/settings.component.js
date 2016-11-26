'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('settings').
  component('settings', {
    templateUrl: 'settings/settings.template.html',
    controller: ['Auth','$window',
      function SettingsController(Auth, $window) {
        this.currentUser = Auth.getCurrentUser();
        if (!this.currentUser) {
          //$window.location.href = '#/logout';
        }
      }
    ],
    $routeConfig: [
      {path: '/breweries', name: 'Breweries', component: 'breweries', useAsDefault: true},
      {path: '/beers', name: 'Beers', component: 'beers'}
    ]
  })
  .component('breweries', {
    template: 'you got breweries!!',
    bindings: { $router: '<' },
    controller: BreweriesComponent
  })

  .component('beers', {
    template: 'you got beers!!',
    bindings: { $router: '<' },
    controller: BeersComponent
  });

function BreweriesComponent(breweryService) {
  var $ctrl = this;
}

function BeersComponent(breweryService) {
  var $ctrl = this;
}
