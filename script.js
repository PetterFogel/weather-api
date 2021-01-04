window.addEventListener("load", main);

function main() {
    addEventListeners();
}

function addEventListeners() {
    const form = document.querySelector(".form-container");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        fetchApiwithFetch();
    });
}

async function fetchApiwithFetch() {
    const searchInput = document.getElementById("input-value");
    const inputValue = searchInput.value;

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=a55a8434945c72a639d00f4164990b98`;
        const result = await fetch(url);
        const data = await result.json();
        // console.log(data);
    
        displayWeather(data);
    } catch(error) {
        handleError(error);
    }
    searchInput.value = "";
}

function handleError(error) {
    console.error(error);
    const errorHandler = document.querySelector(".error-popup");
    errorHandler.style.display = "block", "flex";
}

function displayWeather(data) {
    displayLocation(data);
    calculateToCelsius(data);
    fetchIcon(data);
}

function displayLocation(data) {
    const locationValue = document.querySelector(".location-text");
    locationValue.innerText = data.name + ", " + data.sys.country;
}

function calculateToCelsius(data) {
    const tempValue = document.querySelector(".temp-value");
    let kelvinTemp = data.main.temp;

    let celsiusTemp = Math.round(kelvinTemp - 273.15);
    tempValue.innerHTML = `${celsiusTemp}<span>&deg;</span>`;   
}

// Test
function fetchIcon(data) {
    const icon = data.weather[0].icon;
    const image = document.querySelector("img").src = `./assets/${icon}.png`;
}