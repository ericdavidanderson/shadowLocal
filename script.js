var cityName = document.getElementById("city");
var eventEl = document.getElementById("events-container");
var eightDay = document.getElementById("dailyForecast");

var responseText = document.getElementById("responseText");

function displayWeather(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    var date = data[i].dt;
    var newDate = new Date(date * 1000);
    iconCode = data[i].weather[0].icon;
    eightDay = data[i].weather[0].main;
    morningTemp = Math.round(data[i].temp.morn);
    eveTemp = Math.round(data[i].temp.eve);

    var weatherIcon = document.createElement("img");
    weatherIcon.src = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    document.getElementById("icon").appendChild(weatherIcon);
    var wImg = document.createElement("wImg");
    wImg.setAttribute("scr", weatherIcon);

    // create weather card div
    var wCard = document.createElement("p");
    wCard.textContent = "Test";
    document.body.queryselector("body").appendChild(wCard);
    // wCard.innerText = cityName + "'s 8 day forecast";

    var weatherDiv = document.createElement("div");
    weatherDiv.setAttribute("class", "container");
    weatherDiv.innerHTML = newDate;

    // var weatherPic = document.createElement("div");
    // weatherPic.setAttribute("class", "container");
    // weatherPic.innerHTML = weatherIcon;

    var conditions = document.createElement("div");
    var mornT = document.createElement("div");
    var eveT = document.createElement("div");
    document.body.appendChild(weatherDiv);
    // weatherDiv.appendChild(weatherPic);

    // wCard.appendChild(eightDay);
    // weatherDiv.appendChild(wCard);
    // weatherPic.appendChild(container);
    // conditions.appendChild(container);
    // mornT.appendChild(container);
    // eveT.appendChild(container);
    //

    // weatherDiv.append(weatherIcon);
    // weatherDiv.append(eightDay);
    // weatherDiv.append(morningTemp);
    // weatherDiv.append("Evening temperature" + eveTemp)

    console.log(newDate, weatherIcon, eightDay, morningTemp, eveTemp);

    // weatherDiv.appendChild(newDate);
    // weatherDate.appendChild(weatherIcon);
    // weatherIcon.appendChild(eightDay);
    // eightDay.appendChild(morningTemp);
    // morningTemp.appendChild(eveTemp);

    //Create img element for weather card
  }
}

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
      displayWeather(response.daily);
    });
}
document.getElementById("submitCity").addEventListener("click", getWeather);
