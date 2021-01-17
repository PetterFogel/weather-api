// IF looparna kommer bara ange lokala vädret eftersom data === true inte är sann.

window.addEventListener("load", main);

function main() {
    getLocalWeather();
    addEventListeners();
}

function addEventListeners() {
    const form = document.querySelector(".form-container");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        fetchApiwithFetch();
    });
}

function getLocalWeather() {
    if(navigator.geolocation) {
        fetchCurrentPosition();
    }
}

async function fetchCurrentPosition() {
    let long;
    let lat;

    navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        test2(long, lat);
    });
}

async function test2(long, lat) {

    try {
        const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=&appid=a55a8434945c72a639d00f4164990b98`;
        const result = await fetch(api);
        const data = await result.json();
        console.log(data)
        // console.log(data.current.temp);

        // console.log(data.timezone);

        displayWeatherByApi(data);
    } catch(error) {
        handleError(error);
    }
}

async function fetchApiwithFetch() {
    const searchInput = document.getElementById("input-value");
    const inputValue = searchInput.value;
    
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=a55a8434945c72a639d00f4164990b98`;
        const result = await fetch(url);
        const data = await result.json();
        console.log(data);
        
        displayWeatherByApi(data);
    } catch(error) {
        handleError(error);
    }
    searchInput.value = "";
}

function handleError(error) {
    console.error(error);
    const errorHandler = document.querySelector(".error-popup");
    errorHandler.style.display = "block";

    const errorMessage = document.querySelector(".error-popup p");
    errorMessage.innerText = "Cannot find location";
    errorMessage.classList.add("error-message");

    const errorExit = document.querySelector(".error-popup i");
    errorExit.addEventListener("click", () => {
        errorHandler.style.display = "none";
        console.clear();
    });
}

function displayWeatherByApi(data) {
    displayLocation(data);
    calculateToCelsius(data);
    fetchCloudIcon(data);
}

function displayLocation(data) {
    if (data === true) {
        const locationValue = document.querySelector(".location-text");
        locationValue.innerText = data.name + ", " + data.sys.country;
    } else {
        const local = document.querySelector(".location-text");
        local.innerText = data.timezone;
        console.log(local);
    }
}

function calculateToCelsius(data) {
    if (data === true) {
        const tempValue = document.querySelector(".temp-value");
        let kelvinTemp = data.main.temp;
        let celsiusTemp = Math.round(kelvinTemp - 273.15);
        tempValue.innerHTML = `${celsiusTemp}<span>&deg;</span>`;
        console.log(data.main.temp);
    } else {
        const localTemp = document.querySelector(".temp-value");
        let kelvinTemp = data.current.temp;
        let celsiusTemp = Math.round(kelvinTemp - 273.15);
        localTemp.innerHTML = `${celsiusTemp}<span>&deg;</span>`;
        console.log(localTemp);
    }
}

function fetchCloudIcon(data) {
    if (data === true) {
        const icon = data.weather[0].icon;
        const image = document.querySelector("img").src = `./assets/${icon}.png`;
    } else {
        const icon = data.current.weather[0].icon;
        const image = document.querySelector("img").src = `./assets/${icon}.png`;
        console.log(image);
    }
}