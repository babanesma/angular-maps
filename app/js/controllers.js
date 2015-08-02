'use strict';

/* Controllers */

var mapsControllers = angular.module('mapsControllers', ['uiGmapgoogle-maps']);
var polylines = [];
var started = false;
mapsControllers.controller('MapsMainController', ['$scope',
    function ($scope) {
        $scope.map = {center: {latitude: 30.0500, longitude: 31.2333}, zoom: 8};
        $scope.marker = {
            id: 0,
            coords: {
                latitude: 31.128123623911197,
                longitude: 30.645531445312486
            },
            options: {draggable: true},
            events: {
                dragend: function () {

                    document.location.href = "/app/#/route/" +
                            $scope.marker.coords.latitude +
                            '/' +
                            $scope.marker.coords.longitude +
                            '/' +
                            $scope.marker2.coords.latitude +
                            '/' +
                            $scope.marker2.coords.longitude
                            ;
                },
                drag: function () {
                    $scope.polylines = [];

                }
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
                dragend: function () {

                    document.location.href = "/app/#/route/" +
                            $scope.marker.coords.latitude +
                            '/' +
                            $scope.marker.coords.longitude +
                            '/' +
                            $scope.marker2.coords.latitude +
                            '/' +
                            $scope.marker2.coords.longitude
                            ;
                },
                drag: function () {
                    $scope.polylines = [];

                }
            }
        };

    }]);

mapsControllers.controller('MapsParamController', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.map = {center: {latitude: $routeParams.lat, longitude: $routeParams.lang}, zoom: parseInt($routeParams.zoom)};
    }]);

mapsControllers.controller('MapsRouteController', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.map = {center: {latitude: $routeParams.lat_start, longitude: $routeParams.long_start}, zoom: 8};
        $scope.polylines = [];
        polylines = [];
        $scope.marker = {
            id: 0,
            coords: {
                latitude: $routeParams.lat_start,
                longitude: $routeParams.long_start
            },
            options: {draggable: true},
            events: {
                dragend: function () {

                    document.location.href = "/app/#/route/" +
                            $scope.marker.coords.latitude +
                            '/' +
                            $scope.marker.coords.longitude +
                            '/' +
                            $scope.marker2.coords.latitude +
                            '/' +
                            $scope.marker2.coords.longitude
                            ;
                },
                drag: function () {
                    $scope.polylines = [];

                }
            }
        };
        $scope.marker2 = {
            id: 1,
            coords: {
                latitude: $routeParams.lat_end,
                longitude: $routeParams.long_end
            },
            options: {draggable: true},
            events: {
                dragend: function () {

                    document.location.href = "/app/#/route/" +
                            $scope.marker.coords.latitude +
                            '/' +
                            $scope.marker.coords.longitude +
                            '/' +
                            $scope.marker2.coords.latitude +
                            '/' +
                            $scope.marker2.coords.longitude
                            ;
                },
                drag: function () {
                    $scope.polylines = [];

                }
            }
        };

        var directionsService = new google.maps.DirectionsService();

        var start = $routeParams.lat_start + "," + $routeParams.long_start;
        var end = $routeParams.lat_end + "," + $routeParams.long_end;

        var request = {
            origin: start,
            destination: end,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        };


        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                console.log(response);
                process(response);
            }
        });

//        getRoute();
        
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
                    latitude: points[parseInt(point) + 1].G,
                    longitude: points[parseInt(point) + 1].K
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
    }]);
