'use strict';

angular.module('angularjaxrs',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/conta',{templateUrl:'views/conta/search.html',controller:'SearchContaController'})
      .when('/conta/new',{templateUrl:'views/conta/detail.html',controller:'NewContaController'})
      .when('/conta/edit/:contaId',{templateUrl:'views/conta/detail.html',controller:'EditContaController'})
      .otherwise({
        redirectTo: '/conta'
      });
  }])
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });
