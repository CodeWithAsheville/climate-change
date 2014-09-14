var myApp = angular.module('climate', []);

myApp.controller('HomeController', function ($scope, $http) {
  $scope.location = {B: -82.65639099999999, k: 35.544517};
  $scope.past = { avg_high: null, avg_low: null };
  $scope.present = { avg_high: null, avg_low: null };
  $scope.future = { avg_high: null, avg_low: null, precip: null };
  $scope.showPresent = true;

  $scope.opts = {
    future_start: 2046, 
    future_end: 2065, 
    basin_id: 352,
    month: 9,
    month_name: 'September'
  };

  /* PRC Added */
  $scope.months = {
    1: 'January',
    2: 'February', 
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  };

  var d = new Date();
  $scope.opts.month = d.getMonth() + 1;
  $scope.opts.month_name = $scope.months[$scope.opts.month];
  /* End PRC Added */
  
  round = function(n){
    return Math.round(n * 100) / 100;
  }
  
  $scope.load_json = function(){
    var url_start = "http://www.corsproxy.com/climatedataapi.worldbank.org/climateweb/rest/v1/basin/";
    var url_end = "/" + $scope.opts.future_start + "/" + $scope.opts.future_end + "/" + $scope.opts.basin_id + ".JSON";
    
    var url_min = url_start + "mavg/ensemble/a2/50/tmin_means" + url_end;
    var url_max = url_start + "mavg/ensemble/a2/50/tmax_means" + url_end;
    var url_pre = url_start + "mavg/ensemble/a2/50/ppt_means" + url_end;
    var url_amin = url_start + "manom/ensemble/a2/50/tmin_means" + url_end;
    var url_amax = url_start + "manom/ensemble/a2/50/tmax_means" + url_end;
    var url_wund = "http://www.corsproxy.com/api.wunderground.com/api/fcb068a143892194/almanac/q/" + $scope.location.k + "," + $scope.location.B + ".json";
    
    // $http.get(url_min).
    //   success(function(data, status, headers, config) {
    //     console.log(data);
    //     $scope.future.avg_low = round(data[0].monthVals[$scope.opts.month]);
    //     // $scope.present.avg_low = round(data[0].monthVals[$scope.opts.month] - 3);
    //     $http.get(url_amax).
    //       success(function(data, status, headers, config) {
    //         console.log(data);
    //         $scope.past.avg_high = round($scope.future.avg_high - data[0].monthVals[$scope.opts.month]);
    //       });
    //   });
    // $http.get(url_max).
    //   success(function(data, status, headers, config) {
    //     console.log(data);
    //     $scope.future.avg_high = round(data[0].monthVals[$scope.opts.month]);
    //     // $scope.present.avg_high = round(data[0].monthVals[$scope.opts.month] - 3);
    //     $http.get(url_amin).
    //       success(function(data, status, headers, config) {
    //         console.log(data);
    //         $scope.past.avg_low = round($scope.future.avg_low - data[0].monthVals[$scope.opts.month]);
    //       });
    //   });
    // 
    $http.get(url_pre).
      success(function(data, status, headers, config) {
        console.log(data);
        $scope.future.precip = round(data[0].monthVals[$scope.opts.month]);
      });
    
    $http.get(url_wund).
      success(function(data, status, headers, config) {
        console.log("wund");
        console.log(data);
        $scope.present.avg_high = parseInt(data.almanac.temp_high.normal.C);
        $scope.present.avg_low = parseInt(data.almanac.temp_low.normal.C);
        
        $http.get(url_amax).
          success(function(data, status, headers, config) {
            console.log(data);
            $scope.future.avg_high = round($scope.present.avg_high + data[0].monthVals[$scope.opts.month]);
          });
        
        $http.get(url_amin).
          success(function(data, status, headers, config) {
            console.log(data);
            $scope.future.avg_low = round($scope.present.avg_low + data[0].monthVals[$scope.opts.month]);
          });
      });
    }
    
  $(".user-address").geocomplete()
    .bind("geocode:result", function(event, result){
      console.log(result);
      $scope.location = result.geometry.location;
      
      var lat_r = Math.round($scope.location.k);
      var lng_r = Math.round($scope.location.B);
      console.log("lat: " + lat_r + " lng: " + lng_r);
      $scope.opts.basin_id = basin[String(lat_r)][String(lng_r)];
      
      $scope.$apply();
      $scope.load_json();
    })
  
  $scope.load_json();
});


// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function(position)    {
//       new_pos_obj = { k : position.coords.latitude,
//                       B : position.coords.longitude,
//                     };

//       $scope.location = new_pos_obj;
      
//       var lat_r = Math.round($scope.location.k);
//       var lng_r = Math.round($scope.location.B);

//       console.log("lat: " + lat_r + " lng: " + lng_r);
//       $scope.opts.basin_id = basin[String(lat_r)][String(lng_r)];
      
//       $scope.$apply();
//       $scope.load_json();

//  });
// }