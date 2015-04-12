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
      when('/maps/:lat/:lang/:zoom', {
        templateUrl: 'partials/maps.html',
        controller: 'MapsParamController'
      }).
      otherwise({
        redirectTo: '/maps'
      });
  }]);
