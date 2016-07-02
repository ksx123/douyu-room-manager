/**
 * Created by ksx on 16/6/26.
 */


'use strict';
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

angular.module("RoomManager", ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider,$locationProvider, $httpProvider , $logProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/static/views/home.html',
                controller: 'HomeCtrl'
            })
    })
    .controller("NavBarCtrl", function($scope, $window){
        $scope.getUserName = function(){
            return $window.user.name;
        };
    })
.controller("HomeCtrl", function($scope, $http){
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
                $scope.bkResults.forEach(function(e){
                    e.endtime = new Date(+e.endtime * 1000).Format("yyyy-MM-dd hh:mm:ss")
                });
            });
        }
    });