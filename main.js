var userLocation = document.querySelector(".user-location");
var weatherDescription = document.querySelector(".weather-description");
var windSpeed = document.querySelector(".wind-speed");
var windDirection = 0;
var weatherIcon = document.querySelector("img.weather-icon");
var temp = document.querySelector(".temperature");

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
var URL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&" + "lon=" + lon +"&units=metric&APPID=5f99e28b1a3c92cec71c5ca344fccde7";

fetch(URL)
	.then(function(response){
		return response.json();
	})
	.then(function(weatherData){
		console.log(weatherData)
		userLocation.innerHTML = weatherData.name + ", " + weatherData.sys.country;
		weatherDescription.innerHTML = weatherData.weather["0"].description;
		windDirection = Math.floor(weatherData.wind.deg);
		windSpeed.innerHTML = "SW" + " " + weatherData.wind.speed + " knots";
		temp.innerHTML = Math.floor(weatherData.main.temp) + " &#8451";

		var weatherIconCode = weatherData.weather["0"].icon;
		weatherIcon.src = "http://openweathermap.org/img/w/" + weatherIconCode + ".png";
	});

