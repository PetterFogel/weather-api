const submitBtn = document.querySelector(".submit-btn");

window.addEventListener("load", main);

function main() {
    addEventListeners();
}

function addEventListeners() {
    const form = document.querySelector(".form-container");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        fetchApiswithFetch();
    });
}

async function fetchApiswithFetch() {
    const searchInput = document.getElementById("input-value");
    const inputValue = searchInput.value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=a55a8434945c72a639d00f4164990b98`;
    const result = await fetch(url);
    const data = await result.json();
    console.log(data);
    fetchHtmlElements(data);
    calculateToCelsius(data);
}

function fetchHtmlElements(data) {
    const cityValue = document.querySelector(".city-value");
    cityValue.innerText = data.name;
}

function calculateToCelsius(data) {
    const tempValue = document.querySelector(".temp-value");
    let kelvinTemp = data.main.temp;

    let celsiusTemp = Math.round(kelvinTemp - 273.15);
    tempValue.innerText = celsiusTemp;
    
}