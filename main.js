var userLocation = document.querySelector("p.user_location");
var weatherDescription = document.querySelector("p.weather_description");
var windSpeed = document.querySelector("p.wind_speed");
var weatherIcon = document.querySelector("img.weather_icon");

/*if(!navigator.geolocation){
	console.log("Geolocation not supported by the browser");}
	else {
		navigator.geolocation.getCurrentPosition(function(position){
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		})};*/
	
lat = 54.35;
lon = 13.05;

//Weather api
var URL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&" + "lon=" + lon +"&APPID=5f99e28b1a3c92cec71c5ca344fccde7";

fetch(URL)
	.then(function(response){
		return response.json();
	})
	.then(function(weatherData){
		//console.log(weatherData)
		userLocation.innerHTML = weatherData.name;
		weatherDescription.innerHTML = weatherData.weather["0"].description;
		windSpeed.innerHTML = weatherData.wind.deg + " " + weatherData.wind.speed;

		var weatherIconCode = weatherData.weather["0"].icon;
		weatherIcon.src = "http://openweathermap.org/img/w/" + weatherIconCode + ".png";
	});

