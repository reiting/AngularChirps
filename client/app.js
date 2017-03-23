var app = angular.module('Chirper', ['ngRoute']) 

    app.controller('WelcomeController', ['$scope', '$location',
        function ($scope, $location) {
            
            $scope.goToList = function() {
                $location.path('/chirps');
            }
        }]);
    
    app.controller('ListController', ['$scope', '$location', 
        function ($scope, $location) {

        $scope.getTweet= function() {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:3000/api/chirps',
                contentType: 'application/json',
            }).then(function(alltheTweets) {
                $scope.tweets = alltheTweets;
            })
        }

        $scope.getTweet();

        
    }]);
    



app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'welcome.html',
            controller: 'WelcomeController',
        })
        .when('/chirps', {
            templateUrl: 'list.html',
            controller: 'ListController',
        })
        .when('/chirps:id', {
            templateUrl: 'single_view.html',
            controller: '',
        })
        .when('/chirps:id/update', {
            templateUrl: 'single_update.html',
            controller:'',
        })
        .otherwise({
            redirectTo: '/',
        })
}])