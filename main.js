$(function(){

var userCordinates = [54.35,13.05];
var URL = createURL(userCordinates);
fetchData(URL);

//Event to search the weather data for the entered address
document.getElementById("search-term").addEventListener('change',handleSearch);

function fetchData(URL){
	fetch(URL)
	.then(function(response){
		return response.json();
	})
	.then(function(wData){   //wData is Weather Data
		// console.log(wData)
		$(".user-location").html(wData.name + ", " + wData.sys.country);
		$(".weather-description").html(wData.weather["0"].description);
		$(".wind-speed").html("Wind: " + wData.wind.speed + " knots " + "from " +  degToCompass(wData.wind.deg));
		// $(".wind-direction").html("Wind: " + degToCompass(wData.wind.deg) + from + " " + );
		$(".weather-icon").attr('src',"https://openweathermap.org/img/w/" + wData.weather["0"].icon + ".png");

		$(".temperature").html(Math.floor(wData.main.temp) + " &#8451");
		$("input#degree").on("change", function(){
			$(".temperature").html(Math.floor(wData.main.temp) + " &#8451");  //Make unit "C"
			$("label[for=degree]").css("color","blue");
			$("label[for=degree]").css("font-size","20px");
			$("label[for=fahrenheit]").css("color","black");
			$("label[for=fahrenheit]").css("font-size","18px");
		})
		$("input#fahrenheit").on("change", function(){
			$(".temperature").html(Math.floor(wData.main.temp * 9/5 + 32) + " &#8457")  //Make unit "F"
			$("label[for=degree]").css("color","black");
			$("label[for=degree]").css("font-size","18px");
			$("label[for=fahrenheit]").css("color","blue");
			$("label[for=fahrenheit]").css("font-size","20px");
		})
	})
}

//User Current Geolocation
function currentlocation(){
	if(!navigator.geolocation){
		console.log("Geolocation not supported by the browser");
	}
	else {
		navigator.geolocation.getCurrentPosition(function(position){
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
		})
		return [lat,lon];
	}
}

//Weather api URL
function createURL([lat,lon]){
	var URL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&" + "lon=" + lon +"&units=metric&APPID=5f99e28b1a3c92cec71c5ca344fccde7";
	return URL;
}

//Degree to compass converter
function degToCompass(num){
	const val =  Math.floor((num / 45) + 0.5);
	const arr = ["N","NE","E", "SE","S","SW","W","NW"];
	return arr[(val % 8)]
}

//Function to handle change event on searh bar
function handleSearch(){
	return new Promise(function(resolve,reject){
	var geocoder = new google.maps.Geocoder();
	var address = document.getElementById('search-term').value;

    	geocoder.geocode({ 'address': address }, function (results, status) {

	        if (status == google.maps.GeocoderStatus.OK) {
	            latitude = results[0].geometry.location.lat();
	            longitude = results[0].geometry.location.lng();
	            resolve([latitude,longitude])
	    	}
		})} 
	)
	.then(coordinates => createURL(coordinates))
	.then(URL => fetchData(URL))
}



})