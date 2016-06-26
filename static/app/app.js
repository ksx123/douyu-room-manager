/**
 * Created by ksx on 16/6/26.
 */


'use strict';
angular.module("RoomManager", [])
.controller("home", function($scope, $http){
        $scope.input = {};
        $scope.sort = 0;
        $scope.switchSort = function () {
            $scope.sort = ($scope.sort === 1) ? 0 : 1;
            $scope.search();
        };
        $scope.search = function(){
            console.log("name", $scope.input.name);
            $http.get("/api/getUserMsg?sort="+ $scope.sort +"&name=" + $scope.input.name).success(function(data){
               console.log(arguments);
                $scope.results = data;
            });
        }
    });