/**
 * Created by ksx on 16/6/26.
 */


'use strict';
angular.module("RoomManager", [])
.controller("home", function($scope, $http){
        $scope.input = {};
        $scope.sort = 0;
        $scope.bkSort = 0;
        $scope.switchSort = function () {
            $scope.sort = ($scope.sort === 1) ? 0 : 1;
            $scope.search();
        };
        $scope.switchBKSort = function () {
            $scope.bkSort = ($scope.bkSort === 1) ? 0 : 1;
            $scope.searchBlackers();
        };

        $scope.search = function(){
            console.log("name", $scope.input.name);
            $http.get("/api/getUserMsg?sort="+ $scope.sort +"&name=" + $scope.input.name).success(function(data){
               console.log(arguments);
                $scope.results = data;
            });
        };

        $scope.setectBK = function(d){
            $scope.input.name = d.dnic;
            $scope.search();
        };

        $scope.searchBlackers = function(){
            console.log("name", $scope.input.bkName);
            console.log("operator", $scope.input.operator);
            var url = "/api/getBlackres?sort="+ $scope.bkSort;
            if(!!$scope.input.bkName){
                url += "&name=" + $scope.input.bkName
            }
            if(!!$scope.input.operator){
                url += "&operator=" + $scope.input.operator
            }
            $http.get(url).success(function(data){
               console.log(arguments);
                $scope.bkResults = data;
            });
        }
    });