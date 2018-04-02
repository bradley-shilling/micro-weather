// set api key for open weather map
const apiKey = "d511dcf01ae12e21cb4864c9462fa41d";


//variables
let cityName;
let currentTemp;
let highTemp;
let lowTemp;
let currentWeatherCode;
let sunrise;
let sunset;
let weatherCode;

let searchTerm;
let useDeviceLocation;
let tempatureType;

let position;
let lat;
let long;

let returnedLat;
let returnedLong;
let inverseLat;
let inverseLong;

let inverseCityName;
let inverseCurrentTemp;
let inverseHighTemp;
let inverseLowTemp;
let inverseCurrentWeatherCode;
let inverseSunrise;
let inverseSunset;
let inverseWeatherCode;

let apiQuery;

let imgName;
// for testing
let themeName = "default";


//snarky messages 
let snarkyMessages = {
    200: "thunderstorm with light rain",
    201: "thunderstorm with rain",
    202: "thunderstorm with heavy rain",	 
    210: "light thunderstorm",
    211: "thunderstorm",
    212: "heavy thunderstorm",
    221: "ragged thunderstorm",
    230: "thunderstorm with light drizzle",
    231: "thunderstorm with drizzle",
    232: "thunderstorm with heavy drizzle",

    500: "light rain",
    501: "moderate rain",
    502: "heavy intensity rain",
    503: "very heavy rain",
    504: "extreme rain",
    511: "freezing rain",
    520: "light intensity shower rain",
    521: "shower rain",
    522: "heavy intensity shower rain",
    531: "ragged shower rain",

    600: "light snow",
    601: "snow",
    602: "heavy snow",
    611: "sleet",
    612: "shower sleet",
    615: "light rain and snow",
    616: "rain and snow",
    620: "light shower snow",
    621: "shower snow",
    622: "heavy shower snow",

    701: "mist",
    711: "smoke",
    721: "haze",
    731: "sand, dust whirls",
    741: "fog",
    751: "sand",
    761: "dust",
    762: "volcanic ash",
    771: "squalls",
    781: "tornado",

    800: "clear sky",

    801: "few clouds",
    802: "scattered clouds",
    803: "broken clouds",
    804: "overcast clouds",

    900: "tornado",
    901: "tropical storm",
    902: "hurricane",
    903: "cold",
    904: "hot",
    905: "windy",
    906: "hail",

    951: "calm",
    952: "light breeze",
    953: "gentle breeze",
    954: "moderate breeze",
    955: "fresh breeze",
    956: "strong breeze",
    957: "high wind, near gale",
    958: "gale",
    959: "severe gale",
    960: "storm",
    961: "violent storm",
    962: "hurricane"
};


//make call to api
function getCurrentWeather(event) {
    // call api
    fetch(apiQuery)
        .then((response) => response.json())
        .then((json) => {
        //get weather params   
            let weatherObjectId = json.id;
            cityName = json.name;
            
            if (tempatureType === 'kelvin'){
                currentTemp = justK(json.main.temp);
                lowTemp = justK(json.main.temp_min);
                highTemp = justK(json.main.temp_max);
            } else if (tempatureType === 'celsius') {
                currentTemp = kToC(json.main.temp);
                lowTemp = kToC(json.main.temp_min);
                highTemp = kToC(json.main.temp_max);
            } else {
                currentTemp = kToF(json.main.temp);
                lowTemp = kToF(json.main.temp_min);
                highTemp = kToF(json.main.temp_max);
            }
            
            
            sunrise = convertTime(json.sys.sunrise);
            sunset = convertTime(json.sys.sunset);
            weatherCode = json.weather[0].id;

            // store returned lat and long
            returnedLat = json.coord.lat;
            returnedLong = json.coord.lon;
            tunnel();

            // draw map 
            //TODO if time allows
            //drawTopMap();


            // output weather params to consol
            console.log("Weather object id: " + weatherObjectId);
            console.log("City name: " + cityName);
            console.log("Current Temp: " + currentTemp);
            console.log("Low Temp: " + lowTemp);
            console.log("High Temp: " + highTemp);
            console.log("Sunrise Raw: " + json.sys.sunrise);
            console.log("Sunrise Formated: " + sunrise);
            console.log("Sunset Raw: " + json.sys.sunset);
            console.log("Sunrise Formated: " + sunset);
            console.log("Weather code: " + weatherCode);
            console.log("Message: " + snarkyMessages[weatherCode]);
            console.log("Image URL: " + getImage(weatherCode));
            
            console.log("Returned Lat: " + returnedLat);
            console.log("Returned Long: " + returnedLong);



            // output weather params to page
            //document.getElementById("weather__id").innerText = weatherObjectId;
            document.getElementById("city__name").innerText = cityName;
            document.getElementById("current__temp").innerText = currentTemp;
            document.getElementById("low__temp").innerText = lowTemp;
            document.getElementById("high__temp").innerText = highTemp;
            document.getElementById("sunrise").innerText = sunrise;
            document.getElementById("sunset").innerText = sunset;
            //document.getElementById("weather__code").innerText = weatherCode;
            document.getElementById("weather__message").innerText = snarkyMessages[weatherCode];
            document.getElementById("weather__image").innerHTML = getImage(weatherCode);

            document.getElementById("lat__long").innerText = "(Lat: " + lat + " Long: " + long + ")";



    });
}


//make call to api for inverse weather
function getInverseWeather(event) {
    // call api
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${inverseLat}&lon=${inverseLong}&APPID=${apiKey}`)
        .then((response) => response.json())
        .then((json) => {
        //get weather params   
            let inverseWeatherObjectId = json.id;
            inverseCityName = json.name;
            
            if (tempatureType === 'kelvin'){
                inverseCurrentTemp = justK(json.main.temp);
                inverseLowTemp = justK(json.main.temp_min);
                inverseHighTemp = justK(json.main.temp_max);
            } else if (tempatureType === 'celsius') {
                inverseCurrentTemp = kToC(json.main.temp);
                inverseLowTemp = kToC(json.main.temp_min);
                inverseHighTemp = kToC(json.main.temp_max);
            } else {
                inverseCurrentTemp = kToF(json.main.temp);
                inverseLowTemp = kToF(json.main.temp_min);
                inverseHighTemp = kToF(json.main.temp_max);
            }
            
            
            inverseSunrise = convertTime(json.sys.sunrise);
            inverseSunset = convertTime(json.sys.sunset);
            inverseWeatherCode = json.weather[0].id;




            // output weather params to consol
            console.log("inverse Weather object id: " + inverseWeatherObjectId);
            console.log("inverse City name: " + inverseCityName);
            console.log("inverse Current Temp: " + inverseCurrentTemp);
            console.log("inverse Low Temp: " + inverseLowTemp);
            console.log("inverse High Temp: " + inverseHighTemp);
            console.log("inverse Sunrise Raw: " + json.sys.sunrise);
            console.log("inverse Sunrise Formated: " + inverseSunrise);
            console.log("inverse Sunset Raw: " + json.sys.sunset);
            console.log("inverse Sunrise Formated: " + inverseSunset);
            console.log("inverse Weather code: " + inverseWeatherCode);
            console.log("inverse Message: " + snarkyMessages[inverseWeatherCode]);
            console.log("inverse Image URL: " + getImage(inverseWeatherCode));
            
            console.log("inverse Lat: " + inverseLat);
            console.log("inverse Long: " + inverseLong);



            // output weather params to page
            //document.getElementById("weather__id").innerText = weatherObjectId;
            document.getElementById("inverse__city__name").innerText = inverseCityName;
            document.getElementById("inverse__current__temp").innerText = inverseCurrentTemp;
            document.getElementById("inverse__low__temp").innerText = inverseLowTemp;
            document.getElementById("inverse__high__temp").innerText = inverseHighTemp;
            document.getElementById("inverse__sunrise").innerText = inverseSunrise;
            document.getElementById("inverse__sunset").innerText = inverseSunset;
            //document.getElementById("weather__code").innerText = weatherCode;
            document.getElementById("inverse__weather__message").innerText = snarkyMessages[inverseWeatherCode];
            document.getElementById("inverse__weather__image").innerHTML = getImage(inverseWeatherCode);

            document.getElementById("invert__lat__long").innerText = "(Lat: " + inverseLat + " Long: " + inverseLong + ")";



    });
}


//image url string
function getImage(weatherCode) {
    if (weatherCode > 199 && weatherCode < 300) {
        // thunderstorm
        imgName = "thunderstorm"
    } else if (weatherCode > 499 && weatherCode < 600) {
        // rain
        imgName = "rain"
    } else if (weatherCode > 599 && weatherCode < 700) {
        // snow
        imgName = "snow"
    } else if (weatherCode > 699 && weatherCode < 800) {
        // random conditions break out
        imgName = "random"
    } else if (weatherCode == 800) {
        // clear sky
        imgName = "clear"
    } else if (weatherCode > 800 && weatherCode < 900) {
        // clear sky
        imgName = "clouds"
     } else if (weatherCode == 900 || weatherCode == 901 || weatherCode == 902) {
        // tornado - hurricane
        imgName = "tornado"
    } else if (weatherCode == 903) {
        // cold
        imgName = "cold"
    } else if (weatherCode == 904) {
        // hot
        imgName = "hot"
    } else if (weatherCode == 905) {
        // windy
        imgName = "windy"
    } else if (weatherCode == 906) {
        // hail
        imgName = "hail"
    } else if (weatherCode > 950 && weatherCode < 957) {
        // fairly calm
        imgName = "calm"
    } else if (weatherCode > 956 && weatherCode < 961) {
        // some wind
        imgName = "slight-wind"
    } else if (weatherCode > 960 && weatherCode < 963) {
        // huricane force wind
        imgName = "big-wind"
    } else {
        //wtf
        imgName = "wtf"
    }
    return `<img src="img/${themeName}/${imgName}.svg" class="weather__icon" alt="Current weather icon">`;
};

// time conversion
function convertTime(valNum) {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(valNum*1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // display time in 10:30 format
    return hours + ':' + minutes.substr(-2) + " " + ampm;
};



// just kelvin t
function justK(valNum) {
    return parseFloat(Math.round(valNum * 100) / 100).toFixed(1) + " K";
    };

// kelvin to Farenheight
function kToF(valNum) {
    return parseFloat(Math.round((((valNum-273.15)*1.8)+32) * 100) / 100).toFixed(1)  + " F";
    };

// kelvin to Celcius
function kToC(valNum) {
    return parseFloat(Math.round((valNum-273.15)* 100) / 100).toFixed(1)  + " C";
};





//set up weather params based on user input
function setWeatherParams(event) {
    // hide main search on submission
    document.getElementById('main__search').style.display = 'none';
    // Show weather details  on submission
    document.getElementById('weather__details').style.display = 'block';
    document.getElementById('new__lookup__wrapper').style.display = 'grid';
    document.getElementById('inverse__weather__details').style.display = 'block';
    document.getElementById('globe').style.display = 'block';

    searchTerm = document.getElementById('city').value; // city name to search
    useDeviceLocation = document.getElementById('useMyLocation').checked; // use geo location if true
    if (document.getElementById('kelvin').checked) { // check type of temp
        tempatureType  = document.getElementById('kelvin').value;
    } else if (document.getElementById('celsius').checked){
        tempatureType  = document.getElementById('celsius').value;
    } else if (document.getElementById('fahrenheit').checked){
        tempatureType  = document.getElementById('fahrenheit').value;
    } else { // f by default
        tempatureType  = document.getElementById('fahrenheit').value;
    }

    if (useDeviceLocation === true){
        getLocation();
    } else { // set query to use search term
        apiQuery=`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&APPID=${apiKey}`;
        getCurrentWeather();
    }

    // log search param to console
    console.log("Search Term: " + searchTerm);
    console.log("Use Device Location: " + useDeviceLocation);
    console.log("Temp Type: " + tempatureType);

}
//ass listener
document.getElementById("new__form__submission").addEventListener("click", setWeatherParams);




// get geo location
function getLocation() {
    if (navigator.geolocation) {
        position = navigator.geolocation.getCurrentPosition(mapLatAndLong);
        
        function mapLatAndLong(position) {
            lat = position.coords.latitude; 
            long = position.coords.longitude;

            // log device location param to console
            console.log("Device Lat: " + lat);
            console.log("Device Long: " + long);
           
            apiQuery=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${apiKey}`;
            getCurrentWeather();
        }

    } else {  
    }
}

// invert lat and lon
//the latitude of the place you want to find the antipodes must be converted to the opposite hemisphere (eg: 45° North will be 45° South or -45°);
//the longitude of the place you want to find the antipodes must be subtracted from 180° and the result will be converted to opposite hemisphere (eg: 25° West will be 180° - 25° = 155° East or -155°).
function tunnel(event) {
    if (returnedLat > 0 ) {
        inverseLat = -returnedLat;
    } else {
        inverseLat = Math.abs(returnedLat);
    }

    if (returnedLong > 0) {
        inverseLong = -(180 - returnedLong)
    } else {
        inverseLong = (180 - Math.abs(returnedLong))
    }
    getInverseWeather();
   
}





//new search
function newSearch(event) {
    // show main search on submission
    document.getElementById('main__search').style.display = 'block';
    // hide weather details  on submission
    document.getElementById('weather__details').style.display = 'none';
    document.getElementById('inverse__weather__details').style.display = 'none';
    document.getElementById('new__lookup__wrapper').style.display = 'none';
    document.getElementById('globe').style.display = 'none';

    //clear check box and input field
    document.getElementById("useMyLocation").checked = false;
    document.getElementById("city").value = "";


    // clear old weather data
    document.getElementById("inverse__city__name").innerText = "";
    document.getElementById("current__temp").innerText = "";
    document.getElementById("low__temp").innerText = "";
    document.getElementById("high__temp").innerText = "";
    document.getElementById("sunrise").innerText = "";
    document.getElementById("sunset").innerText = "";
    document.getElementById("weather__message").innerText = "Loading";
    document.getElementById("weather__image").innerHTML = "";

    document.getElementById("lat__long").innerHTML = "";

    document.getElementById("city__name").innerText = "";
    document.getElementById("inverse__current__temp").innerText = "";
    document.getElementById("inverse__low__temp").innerText = "";
    document.getElementById("inverse__high__temp").innerText = "";
    document.getElementById("inverse__sunrise").innerText = "";
    document.getElementById("inverse__sunset").innerText = "";
    document.getElementById("inverse__weather__message").innerText = "Loading";
    document.getElementById("inverse__weather__image").innerHTML = "";

    document.getElementById("invert__lat__long").innerHTML = "";

    // reset globe 
    if (document.getElementById('weather__master').classList.contains('inverted')) {
        document.getElementById('weather__master').classList.remove('inverted');
        document.getElementById("globe").innerHTML = "<img src='img/earth.svg'>";
    }

}
//ass listener
document.getElementById("new__lookup").addEventListener("click", newSearch);


//invert
function invertWeather(event) {
    // invert globe
    if (document.getElementById('weather__master').classList.contains('inverted')) {
        document.getElementById('weather__master').classList.remove('inverted');
        document.getElementById("globe").innerHTML = "<img src='img/earth.svg'>";
    } else {
        document.getElementById('weather__master').classList.add('inverted');
        document.getElementById("globe").innerHTML = "<img src='img/earth-inverted.svg'>";
    }
}
//add listener
document.getElementById("invert").addEventListener("click", invertWeather);



// //TODO if time allows
// //top map
// function drawTopMap() {
//     // Basic options for a simple Google Map
//     // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
//     var mapOptions = {
//         // How zoomed in you want the map to start at (always required)
//         zoom: 11,

//         // The latitude and longitude to center the map (always required)
//         center: new google.maps.LatLng(returnedLat, returnedLong), // New York

//         // How you would like to style the map. 
//         // This is where you would paste any style found on Snazzy Maps.
//         styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
//     };

//     // Get the HTML DOM element that will contain your map 
//     // We are using a div with id="map" seen below in the <body>
//     let mapElement = document.getElementById('map');

//     // Create the Google Map using our element and options defined above
//     let map = new google.maps.Map(mapElement, mapOptions);

//     // Let's also add a marker while we're at it
//     let marker = new google.maps.Marker({
//         position: new google.maps.LatLng(returnedLat, returnedLong),
//         map: map,
//         title: 'Our Position!'
//     });
// }

