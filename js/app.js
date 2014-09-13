// This will be converted to angular, but I'm testing things out
  console.log('PRC Test');
  var user_lat = false;
  var user_lng = false;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position)    {
        console.log(position.coords);
        user_lat = position.coords.latitude;
        user_lng = position.coords.longitude;
        $("#geocode-result").html(position.coords.latitude+ ", " + position.coords.longitude);
       });
    }

    // $(document).ready(function(){
      
    // });


//'geolocation', 
    // angular.module('myApp',['geocoder'])
    //   .controller('geoCtrl', function ($scope,geolocation,Geocoder ) {
    //     geolocation.getLocation().then(function(data){
    //       console.log(data);
    //       Geocoder.addressForLatLng(data.coords.latitude, data.coords.longitude).then(function(data){
    //         console.log(data)
    //       })
      
    //   });
    // });


function ClimateChangeController($scope) {
  // $scope.user_lat = false;
  // $scope.user_lng = false;
  // $scope.monthName = [  "",
  //                       "January", "February", "March", "April", 
  //                       "May", "June", "July", "August", "September", 
  //                       "October", "November", "December"
  //                     ];
}