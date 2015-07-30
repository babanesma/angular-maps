'use strict';

/* Controllers */

var mapsControllers = angular.module('mapsControllers', ['uiGmapgoogle-maps']);
var polylines = [];
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
                latitude: 31.0605,
                longitude: 31.2700
            },
            options: {draggable: true},
            events: {
            }
        };

        var directionsService = new google.maps.DirectionsService();

        var start = $scope.marker.coords.latitude + "," + $scope.marker.coords.longitude;
        var end = $scope.marker2.coords.latitude + "," + $scope.marker2.coords.longitude;

        var request = {
            origin: start,
            destination: end,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        };


        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                process(response);
            }
        });


        function process(response) {
            var points = response.routes[0].overview_path;
            var point;
            for (point in points) {
                var real_paths = [];

                if (point == points.length - 1) {
                    break;
                }
                real_paths.push(
                        {
                            latitude: points[point].G,
                            longitude: points[point].K
                        },
                        {
                            latitude: points[parseInt(point)+1].G,
                            longitude: points[parseInt(point)+1].K
                        }
                );
                polylines.push({
                    id: point + 1,
                    path: real_paths,
                    stroke: {
                        color: '#6060FB',
                        weight: 3
                    },
                    icons: [{
                            icon: {
                                path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                            },
                            offset: '25px',
                        }]
                });
            }
        }

        $scope.polylines = polylines;

//        console.log($scope);

    }]);

mapsControllers.controller('MapsParamController', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.map = {center: {latitude: $routeParams.lat, longitude: $routeParams.lang}, zoom: parseInt($routeParams.zoom)};
    }]);
