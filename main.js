$(function(){
	
	//Default coordinates
	var lat = 52.5;
	var lon = 13.4;
	fetchData(lat,lon);
	currentLocation();

	// Event to clear the search bar
	var input = document.getElementById("search-bar");
	input.addEventListener('click',function(){
		$("#search-bar").val("");
	});
	
	// Search bar autocomplete
	var autocomplete = new google.maps.places.Autocomplete(input,{type:["geocode"]});
	autocomplete.addListener('place_changed', function() {
		var lat = autocomplete.getPlace().geometry.location.lat();
		var lon = autocomplete.getPlace().geometry.location.lng();		
		fetchData(lat,lon);
	})

//Funtions *****************************************************************

function currentLocation(){
	return new Promise(function(resolve,reject){
		if(!navigator.geolocation){
			reject("Geolocation not supported by the browser");
		}
		else {
			navigator.geolocation.getCurrentPosition(function(position){
				var lat = position.coords.latitude;
				var lon = position.coords.longitude;
				resolve([lat,lon]);
			})				
		}
	})
	.then(function([lat,lon]){
		fetchData(lat,lon);
	});
}

//Fetches weather data and updates the webpage
function fetchData(lat,lon){
	var URL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&" + "lon=" + lon +"&units=metric&APPID=5f99e28b1a3c92cec71c5ca344fccde7";
	fetch(URL)
	.then(function(response){
		return response.json();
	})
	.then(function(wData){   //wData is Weather Data
		// console.log(wData)
		$(".user-location").html(wData.name + ", " + wData.sys.country);
		$(".weather-description").html(wData.weather["0"].description);
		$(".wind-speed").html("Wind: " + wData.wind.speed + " knots " + "from " +  degToCompass(wData.wind.deg));
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

//Degree to compass converter
function degToCompass(num){
	const val =  Math.floor((num / 45) + 0.5);
	const arr = ["N","NE","E", "SE","S","SW","W","NW"];
	return arr[(val % 8)]
}

})