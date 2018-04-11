$(function(){

function degToCompass(num){
    const val =  Math.floor((num / 45) + 0.5);
    const arr = ["N","NE","E", "SE","S","SW","W","NW"];
    return arr[(val % 8)]
    }

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
	.then(function(wData){   //wData is Weather Data
		//console.log(wData)
		$(".user-location").html(wData.name + ", " + wData.sys.country);
		$(".weather-description").html(wData.weather["0"].description);
		$(".wind-speed").html(degToCompass(wData.wind.deg) + " " + wData.wind.speed + " knots");
		$(".weather-icon").attr('src',"https://openweathermap.org/img/w/" + wData.weather["0"].icon + ".png");

		$(".temperature").html(Math.floor(wData.main.temp) + " &#8451");
		$("input#degree").on("change", function(){
			$(".temperature").html(Math.floor(wData.main.temp) + " &#8451");  //Make unit "C"
			$("label[for=degree]").css("color","blue");
			$("label[for=degree]").css("font-size","22px");
			$("label[for=fahrenheit]").css("color","black");
			$("label[for=fahrenheit]").css("font-size","20px");
		})
		$("input#fahrenheit").on("change", function(){
			$(".temperature").html(Math.floor(wData.main.temp * 9/5 + 32) + " &#8457")  //Make unit "F"
			$("label[for=degree]").css("color","black");
			$("label[for=degree]").css("font-size","20px");
			$("label[for=fahrenheit]").css("color","blue");
			$("label[for=fahrenheit]").css("font-size","22px");
		})

		$()
	});

});