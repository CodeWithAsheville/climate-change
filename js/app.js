var myApp = angular.module('climate', []);

myApp.controller('HomeController', function ($scope, $http) {
  $scope.location = null;
  $scope.present = { avg_high: null, avg_low: null };
  $scope.future = { avg_high: null, avg_low: null };
  
  $scope.opts = {
    future_start: 2046, 
    future_end: 2065, 
    basin_id: 385,
    month: 1,
  };
  
  round = function(n){
    return Math.round(n * 100) / 100;
  }
  
  $scope.load_json = function(){
    var url_min = "http://www.corsproxy.com/climatedataapi.worldbank.org/climateweb/rest/v1/basin/mavg/ensemble/a2/50/tmin_means/" + $scope.opts.future_start + "/" + $scope.opts.future_end + "/" + $scope.opts.basin_id + ".JSON";
    var url_max = "http://www.corsproxy.com/climatedataapi.worldbank.org/climateweb/rest/v1/basin/mavg/ensemble/a2/50/tmax_means/" + $scope.opts.future_start + "/" + $scope.opts.future_end + "/" + $scope.opts.basin_id + ".JSON";
    
    var url_amin = "http://www.corsproxy.com/climatedataapi.worldbank.org/climateweb/rest/v1/basin/manom/ensemble/a2/50/tmin_means/" + $scope.opts.future_start + "/" + $scope.opts.future_end + "/" + $scope.opts.basin_id + ".JSON";

    var url_amax = "http://www.corsproxy.com/climatedataapi.worldbank.org/climateweb/rest/v1/basin/manom/ensemble/a2/50/tmax_means/" + $scope.opts.future_start + "/" + $scope.opts.future_end + "/" + $scope.opts.basin_id + ".JSON";
    
    $http.get(url_min).
      success(function(data, status, headers, config) {
        console.log(data);
        $scope.future.avg_low = round(data[0].monthVals[$scope.opts.month]);
        // $scope.present.avg_low = round(data[0].monthVals[$scope.opts.month] - 3);
        $http.get(url_amax).
          success(function(data, status, headers, config) {
            console.log(data);
            $scope.present.avg_high = round($scope.future.avg_high - data[0].monthVals[$scope.opts.month]);
          });
      });
    $http.get(url_max).
      success(function(data, status, headers, config) {
        console.log(data);
        $scope.future.avg_high = round(data[0].monthVals[$scope.opts.month]);
        // $scope.present.avg_high = round(data[0].monthVals[$scope.opts.month] - 3);
        $http.get(url_amin).
          success(function(data, status, headers, config) {
            console.log(data);
            $scope.present.avg_low = round($scope.future.avg_low - data[0].monthVals[$scope.opts.month]);
          });
      });
  }
    
  $(".user-address").geocomplete()
    .bind("geocode:result", function(event, result){
      console.log(result);
      $scope.location = result;
      
      var lat_r = Math.round(result.geometry.location.k);
      var lng_r = Math.round(result.geometry.location.B);
      console.log("lat: " + lat_r + " lng: " + lng_r);
      $scope.opts.basin_id = basin[String(lat_r)][String(lng_r)];
      
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