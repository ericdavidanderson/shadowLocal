var cityName = document.getElementById("city");
var eventEl = document.getElementById("events-container");
var fiveDay = document.getElementById("5dayForecast");

var responseText = document.getElementById("responseText");

function getWeather() {
  var apiRequest =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName.value +
    "&appid=15a2f6e975005b96c0df56340849949d&units=imperial";
  console.log(apiRequest);
  fetch(apiRequest)
    .then(function (res) {
      return res.json();
    })
    .then(function (response) {
      console.log(response);
      responseText.textContent = Math.round(response.main.feels_like);
      console.log(response.name);
      gps(response.coord.lat, response.coord.lon);
    });
}
function gps(lat, long) {
  var apiRequest =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    long +
    "&exclude=minutely,hourly,alerts&appid=15a2f6e975005b96c0df56340849949d&units=imperial";
  fetch(apiRequest)
    .then(function (res) {
      return res.json();
    })
    .then(function (response) {
      console.log(response);
      fiveDay.textContent = response.daily[0].weather[0].main;
      var weatherIcon = document.createElement("img");
      weatherIcon.src = "http://openweathermap.org/img/wn/10d.png";
      document.getElementById("icon").appendChild(weatherIcon);
    });
}
document.getElementById("submitCity").addEventListener("click", getWeather);
