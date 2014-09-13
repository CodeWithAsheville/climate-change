var myApp = angular.module('climate', []);

myApp.controller('HomeController', ['$scope', function($scope) {
  $scope.location = null;
  
  console.log("hi");
  $(".user-address").geocomplete()
    .bind("geocode:result", function(event, result){
      console.log(result);
      $scope.location = result;
    })
}]);


console.log('PRC Test');
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function(position)    {
  console.log(position);
 });
}