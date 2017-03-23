var app = angular.module('Chirper', ['ngRoute']) 
    //controller for welcome page
    app.controller('WelcomeController', ['$scope', '$location',
        function ($scope, $location) {
            //makes button on welcome page go to list.html
            $scope.goToList = function() {
                $location.path('/chirps');
            }
        }]);
    //controller for list page
    app.controller('ListController', ['$scope', '$location', '$http', 
        function ($scope, $location, $http) {
        //get request for chirps
        $scope.getChirps= function() {
            $http({
                type: 'GET',
                url: 'http://localhost:3000/api/chirps',
            }).then(function(alltheChirps) {
                console.log(alltheChirps);
                $scope.chirps = alltheChirps.data;
            })
        }
        //calls the function so it will run
        $scope.getChirps();

        //get request to get all users for drop down
        $scope.getUsers= function() {
            $http({
                type: 'GET',
                url: 'http://localhost:3000/api/users',
            }).then(function(alltheUsers) {
                console.log(alltheUsers);
                $scope.users = alltheUsers.data;
            })
        }
        $scope.getUsers();
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