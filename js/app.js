var myApp = angular.module('climate', []);

myApp.controller('HomeController', function ($scope, $http) {
  $scope.location = null;
  $scope.future = { avg_high: 1, avg_low: null };
  
  $scope.opts = {
    present_start: 2046, 
    present_end: 2065, 
    future_start: 2046, 
    future_end: 2065, 
    basin_id: 385,
    month: 1,
  };
    
  $scope.load_json = function(){
    var url_min = "http://www.corsproxy.com/climatedataapi.worldbank.org/climateweb/rest/v1/basin/mavg/ensemble/a2/50/tmin_means/" + $scope.opts.present_start + "/" + $scope.opts.present_end + "/" + $scope.opts.basin_id + ".JSON";
    var url_max = "http://www.corsproxy.com/climatedataapi.worldbank.org/climateweb/rest/v1/basin/mavg/ensemble/a2/50/tmax_means/" + $scope.opts.present_start + "/" + $scope.opts.present_end + "/" + $scope.opts.basin_id + ".JSON";
    
    $http.get(url_min).
      success(function(data, status, headers, config) {
      console.log(data);
      $scope.future.avg_low = Math.round(data[0].monthVals[$scope.opts.month] * 100) / 100;
    });
    $http.get(url_max).
      success(function(data, status, headers, config) {
      console.log(data);
      $scope.future.avg_high = Math.round(data[0].monthVals[$scope.opts.month] * 100) / 100;
    });
  }
    
  $(".user-address").geocomplete()
    .bind("geocode:result", function(event, result){
      console.log(result);
      $scope.location = result;
      
      $scope.future.avg_high = 70;
      $scope.future.avg_low = 60;
      $scope.$apply();
    })
  
  $scope.load_json();
});


console.log('PRC Test');
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function(position)    {
  console.log(position);
 });
}