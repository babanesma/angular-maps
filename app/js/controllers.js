'use strict';

/* Controllers */

var mapsControllers = angular.module('mapsControllers', ['uiGmapgoogle-maps']);

mapsControllers.controller('MapsMainController', ['$scope',
    function ($scope) {
        $scope.map = { center: { latitude: 30.0500, longitude: 31.2333 }, zoom: 8 };
    }]);

mapsControllers.controller('MapsParamController', ['$scope','$routeParams',
    function ($scope, $routeParams) {
        $scope.map = { center: { latitude: $routeParams.lat, longitude: $routeParams.lang }, zoom: parseInt($routeParams.zoom)};
    }]);
