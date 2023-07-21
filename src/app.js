console.log("hello world");

function displayCity(response){
  console.log(response);
  let temp = Math.round(response.data.main.temp);
  let h1= document.querySelector("h1");
  h1.innerHTML= temp;
  let description = response.data.weather[0].description;
  let describe = document.querySelector("#descript");
  describe.innerHTML=description;
  let feeling = Math.round(response.data.main.feels_like);
  let feel = document.querySelector("#feels");
  feel.innerHTML= feeling;
  let minimumTemp= Math.round(response.data.main.temp_min);
  let tempMin = document.querySelector("#minTemp");
  tempMin.innerHTML = minimumTemp;
  let maximumTemp= Math.round(response.data.main.temp_max);
  let tempMax = document.querySelector("#maxTemp");
  tempMax.innerHTML = maximumTemp;
  let name = response.data.name;
  let cityName=document.querySelector("h3");
  cityName.innerHTML=name;
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let pressure = document.querySelector("#pressure")
  let windy = Math.round(response.data.wind.speed);
  let press = response.data.main.pressure;
  let humid = response.data.main.humidity;
  wind.innerHTML=windy;
  pressure.innerHTML=press;
  humidity.innerHTML=humid;
}
function findCity(event){
  event.preventDefault();
  let searching = document.querySelector("#search-input");
  console.log(searching.value);
  let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
  let apiEndpoint="https://api.openweathermap.org/data/2.5/weather";
  let units="metric";
  let apiUrl=`${apiEndpoint}?q=${searching.value}&units=${units}&appid=${apiKey}`
  axios.get(apiUrl).then(displayCity)
}


let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", findCity);

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
        "Dec"
      ];
      let nameOfMonths = months[date.getMonth()];
let todayDate = document.querySelector("#date");
todayDate.innerHTML=`${daysOfWeek}, ${day} ${nameOfMonths} ${year}`
