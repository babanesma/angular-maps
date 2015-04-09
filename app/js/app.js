'use strict';

/* App Module */

var mapsApp = angular.module('mapsApp', [
  'ngRoute',
  'mapsControllers',
]);

mapsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/maps', {
        templateUrl: 'partials/maps.html',
        controller: 'MapsMainController'
      }).
      otherwise({
        redirectTo: '/maps'
      });
  }]);
