var myApp = angular.module('climate', []);

myApp.filter('c_or_f', function() {
  return function(temp, temp_format) {
    return Math.round(temp_format == 'f' ? (temp * 1.8) + 32 : temp)
  };
})
  .controller('HomeController', function ($scope, $http) {
  $scope.location = {B: -82.65639099999999, k: 35.544517};
  $scope.past = { avg_high: null, avg_low: null };
  $scope.present = { avg_high: null, avg_low: null };
  $scope.future = { avg_high: null, avg_low: null, precip: null };
  $scope.showPresent = true;
  $scope.temp_format = 'c';
  $scope.temp_word = 'Celsius';
  $scope.activeRegion = 5;
  $scope.using_current_location = false;

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

  round = function(n){
    return Math.round(n * 100) / 100;
  }
  var d = new Date();
  $scope.opts.month = d.getMonth() + 1;
  $scope.opts.month_name = $scope.months[$scope.opts.month];
  /* End PRC Added */

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){

      new_pos_obj = { 
                      k : position.coords.latitude,
                      B : position.coords.longitude,
                    };
                    console.log(new_pos_obj);
                    console.log('geolocate');
       $scope.location = new_pos_obj;
      
      var lat_r = Math.round($scope.location.k);
      var lng_r = Math.round($scope.location.B);

      console.log("lat: " + lat_r + " lng: " + lng_r);
      $scope.opts.basin_id = basin[String(lat_r)][String(lng_r)];
      $scope.using_current_location = true;
    //  $scope.$apply();
      $scope.load_json();
      });
    });
  }
  
  $scope.temp_unit_change = function(val){
    $scope.temp_format = val;
    $scope.temp_word = val == 'f' ? "Fahrenheit" : "Celsius"
  }
  
  $scope.load_json = function(){
    $scope.similarCity = "";
    $scope.activeRegion = "";
    var url_start = "http://www.corsproxy.com/climatedataapi.worldbank.org/climateweb/rest/v1/basin/";
    var url_end = "/" + $scope.opts.future_start + "/" + $scope.opts.future_end + "/" + $scope.opts.basin_id + ".JSON";
    
    var url_min = url_start + "mavg/ensemble/a2/50/tmin_means" + url_end;
    var url_max = url_start + "mavg/ensemble/a2/50/tmax_means" + url_end;
    var url_pre = url_start + "mavg/ensemble/a2/50/ppt_means" + url_end;
    var url_amin = url_start + "manom/ensemble/a2/50/tmin_means" + url_end;
    var url_amax = url_start + "manom/ensemble/a2/50/tmax_means" + url_end;
    var url_wund = "http://www.corsproxy.com/api.wunderground.com/api/fcb068a143892194/almanac/q/" + $scope.location.k + "," + $scope.location.B + ".json";
    
    $http.get(url_pre).
      success(function(data, status, headers, config) {
        console.log(data);
        $scope.future.precip = data[0].monthVals[$scope.opts.month];
      });
    
    $http.get(url_wund).
      success(function(data, status, headers, config) {
        console.log(data);
        $scope.present.avg_high = parseInt(data.almanac.temp_high.normal.C);
        $scope.present.avg_low = parseInt(data.almanac.temp_low.normal.C);
        
        $http.get(url_amax).
          success(function(data, status, headers, config) {
            console.log(data);
            $scope.future.avg_high = $scope.present.avg_high + data[0].monthVals[$scope.opts.month];
          });
        
        $http.get(url_amin).
          success(function(data, status, headers, config) {
            console.log(data);
            $scope.future.avg_low = $scope.present.avg_low + data[0].monthVals[$scope.opts.month];


            console.log('Current month: ' + $scope.opts.month);
            var citiesForCurentMonth = cities_us[$scope.opts.month];
            var globalCitiesForCurentMonth = cities_global[$scope.opts.month];

            var weight = 1; 
            var minValue = 0;
            var smallestSum = 1000000;
            $scope.similarCity = "";

            for(var propertyName in citiesForCurentMonth) {
               var tmax = weight * Math.abs($scope.future.avg_high - citiesForCurentMonth[propertyName].tmax);
               var tmin = weight *  Math.abs($scope.future.avg_low - citiesForCurentMonth[propertyName].tmin);
               var precip = 0 * weight *  Math.abs($scope.future.precip - citiesForCurentMonth[propertyName].pre);
               var sum = tmax + tmin + precip;
               
               console.log(propertyName + " : " + sum);
               console.log('diff: ' + smallestSum + " < " + sum + " | " + $scope.similarCity);


               if(sum < smallestSum){
                smallestSum = sum;
                $scope.similarCity = propertyName;
               }
            }

            for(var propertyName in globalCitiesForCurentMonth) {
               var tmax = weight * Math.abs($scope.future.avg_high - globalCitiesForCurentMonth[propertyName].tmax);
               var tmin = weight *  Math.abs($scope.future.avg_low - globalCitiesForCurentMonth[propertyName].tmin);
               var precip = 0 * weight *  Math.abs($scope.future.precip - globalCitiesForCurentMonth[propertyName].pre);
              
               var sum = tmax + tmin + precip;
               console.log(propertyName + " : " + sum);
               console.log('diff: ' + smallestSum + " < " + sum + " | " + $scope.similarCity);
               if(sum < smallestSum){
                // console.log('update');
                smallestSum = sum;
                $scope.similarCity = propertyName;
               }
            }

            console.log('Checking regions');
            var lat_r = Math.round($scope.location.k);
            var lng_r = Math.round($scope.location.B);

            $scope.activeRegion = regions[lat_r][lng_r];
            console.log('Active Region: '+ $scope.activeRegion);
          });
      });

     

      // PRC

    }
    
  $(".user-address").geocomplete()
    .bind("geocode:result", function(event, result){
      console.log(result);
      $scope.location = result.geometry.location;
      
      var lat_r = Math.round($scope.location.k);
      var lng_r = Math.round($scope.location.B);
      console.log("lat: " + lat_r + " lng: " + lng_r);
      $scope.opts.basin_id = basin[String(lat_r)][String(lng_r)];
      $scope.using_current_location = false;

      $scope.$apply();
      $scope.load_json();

      
      //$scope.activeRegion
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