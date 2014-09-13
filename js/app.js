var myApp = angular.module('spicyApp1', []);

myApp.controller('SpicyController', ['$scope', function($scope) {
    $scope.spice = 'very';

    $scope.chiliSpicy = function() {
        $scope.spice = 'chili';
    };

    $scope.jalapenoSpicy = function() {
        $scope.spice = 'jalapeño';
    };
}]);


console.log('PRC Test');
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function(position)    {
  console.log(position);
 });
}