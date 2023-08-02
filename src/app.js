console.log("hello world");

function displayCity(response) {
  console.log(response);
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
  console.log(searching.value); // not needed
  findCity(searching.value);
});

let celsiusTemperature = null;

function displayFarenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("h1");
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("h1");
  temperatureElement.innerHTML = celsiusTemperature;
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let farenheitLink = document.querySelector("#fahrenheit-link");
farenheitLink.addEventListener("click", displayFarenheit);

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

function displayForecast() {
  let weatherForecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row mt-4 mb-3">`;

  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-3">
            <div class="forecast-days">${day}</div>
            <span class="material-symbols-outlined weather-icon"> air </span>
            <div class="weather-forecast-temps> 
            <span class="forecast-max-temp">43</span>
            <span class="forecast-min-temp">36</span> </div>
          </div>
          `;
  });
  forecastHTML = forecastHTML + `</div>`;
  weatherForecast.innerHTML = forecastHTML;
}

displayForecast();
