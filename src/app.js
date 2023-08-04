function displayForecast(response) {
  let forecast = response.data.daily;
  let weatherForecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row mt-4 mb-3">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-3">
            <div class="forecast-days">${dateFormat(forecastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="42" />
            <div class="weather-forecast-temps> 
            <span class="forecast-max-temp">${Math.round(
              forecastDay.temp.max
            )}º</span>
            <span class="forecast-min-temp">${Math.round(
              forecastDay.temp.min
            )}º</span> </div>
          </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  weatherForecast.innerHTML = forecastHTML;

  function dateFormat(timestamp) {
    let date = new Date(timestamp* 1000);
    let day = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[day];
  }
}

function getForecast(coordinates) {
  let parts = "alerts,minutely,hourly,current";
  let units = "metric";
  let appid = "97c2f6a3b34509ac62090edc5d18d949";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=${parts}&units=${units}&appid=${appid}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayCity(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = celsiusTemperature;
  let description = response.data.weather[0].description;
  let describe = document.querySelector("#descript");
  describe.innerHTML = description;
  let feeling = Math.round(response.data.main.feels_like);
  let feel = document.querySelector("#feels");
  feel.innerHTML = feeling;
  let minimumTemp = Math.round(response.data.main.temp_min);
  let tempMin = document.querySelector("#minTemp");
  tempMin.innerHTML = minimumTemp;
  let maximumTemp = Math.round(response.data.main.temp_max);
  let tempMax = document.querySelector("#maxTemp");
  tempMax.innerHTML = maximumTemp;
  let name = response.data.name;
  let cityName = document.querySelector("h3");
  cityName.innerHTML = name;
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let pressure = document.querySelector("#pressure");
  let windy = Math.round(response.data.wind.speed);
  let press = Math.round(response.data.main.pressure / 33.864);
  let icon = document.querySelector("#todayIcon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${description}`);
  let humid = response.data.main.humidity;
  wind.innerHTML = windy;
  pressure.innerHTML = press;
  humidity.innerHTML = humid;
  getForecast(response.data.coord);
}
function findCity(city) {
  let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCity);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", function (event) {
  event.preventDefault();
  let searching = document.querySelector("#search-input");
  findCity(searching.value);
});

let celsiusTemperature = null;

findCity("New York");

let date = new Date();
let weekDay = date.getDay();
let day = date.getDate();
let year = date.getFullYear();
let month = date.getMonth();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let daysOfWeek = days[date.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let nameOfMonths = months[date.getMonth()];
let todayDate = document.querySelector("#date");
todayDate.innerHTML = `${daysOfWeek}, ${day} ${nameOfMonths} ${year}`;
