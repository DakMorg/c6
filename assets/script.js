
//save weather to local storage
var getWeatherBtn = document.querySelector(".getWeatherBtn");
var userInput = document.querySelector(".searchBar");
const saveWeatherToLocalStorage = () => {
  localStorage.setItem("cityName", userInput.value)
}
getWeatherBtn.addEventListener("click", saveWeatherToLocalStorage)
var savedCity = localStorage.getItem("cityName")

//main weather app
let weather = {
    apiKey: "ce799edeec116539e35783770070d97d",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        //selecting the data I need
        const { name } = data;
        const { temp, humidity } = data.main;
        const { icon, description } = data.weather[0];
        const { speed } = data.wind;
        //displaying data on page
        document.querySelector("#city").innerText = "Weather in " + name;
        document.querySelector("#icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector("#description").innerText = description;
        document.querySelector("#temp").innerText = temp + "°f";
        document.querySelector("#humidity").innerText = "Humidity level: " + humidity + "%";
        document.querySelector("#wind").innerText = "Wind Speed: " + speed + "mph";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".searchBar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});


weather.fetchWeather(savedCity);

//todays date

function time() {
    var currentDay = moment().format('dddd MMMM Do YYYY');
    document.getElementById('date').innerHTML = currentDay;
  }
  setInterval(time, 1000);