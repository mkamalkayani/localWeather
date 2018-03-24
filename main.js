var userLocation = document.querySelector("p.user_location");

if(!navigator.geolocation){
	console.log("Geolocation not supported by the browser");}

else {
	navigator.geolocation.getCurrentPosition(function(position){
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

var URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude
 + "&result_type=locality&key=AIzaSyDXPOmVwTKelJB5cuh0T_Hwac8kuG7UWzo";


	fetch(URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
  	userLocation.innerHTML = myJson.results[0].formatted_address;
  });

})};

