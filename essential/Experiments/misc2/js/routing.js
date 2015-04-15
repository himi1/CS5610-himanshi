var app = angular.module("myApp", ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'ng-Route/home.html',

        }).
        when('/about', {
            templateUrl: 'ng-Route/about.html',

        })
        .when('/contact', {
            templateUrl: 'ng-Route/contact.html',

        })
        .when('/profile', {
            templateUrl: 'ng-Route/profile.html',

        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);
