'use strict';

/* App Module */

var mapsApp = angular.module('mapsApp', [
  'ngRoute',
  'mapsControllers',
]);

mapsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/route/:lat_start/:long_start/:lat_end/:long_end', {
        templateUrl: 'partials/maps.html',
        controller: 'MapsRouteController'
      }).
      when('/maps', {
        templateUrl: 'partials/maps.html',
        controller: 'MapsMainController'
      }).
      when('/maps/:lat/:lang/:zoom', {
        templateUrl: 'partials/maps.html',
        controller: 'MapsParamController'
      }).
      otherwise({
        redirectTo: '/maps'
      });
  }]);
