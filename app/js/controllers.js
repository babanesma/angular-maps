'use strict';

/* Controllers */

var mapsControllers = angular.module('mapsControllers', ['uiGmapgoogle-maps']);

mapsControllers.controller('MapsMainController', ['$scope',
    function ($scope) {
        $scope.map = {center: {latitude: 30.0500, longitude: 31.2333}, zoom: 8};
        $scope.marker = {
            id: 0,
            coords: {
                latitude: 30.0500,
                longitude: 31.2333
            },
            options: {draggable: true},
            events: {                
            }
        };
        $scope.marker2 = {
            id: 1,
            coords: {
                latitude: 30.0505,
                longitude: 31.2338
            },
            options: {draggable: true},
            events: {                
            }
        };
    }]);

mapsControllers.controller('MapsParamController', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.map = {center: {latitude: $routeParams.lat, longitude: $routeParams.lang}, zoom: parseInt($routeParams.zoom)};
    }]);
