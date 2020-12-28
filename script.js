const inputValue = document.getElementById("input-value");
const submitBtn = document.querySelector(".submit-btn");


window.addEventListener("load", main);

function main() {
    addEventListeners();
}

function addEventListeners() {
    const form = document.querySelector(".form-container");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        fetchYearswithFetch();
    });
}

async function fetchYearswithFetch() {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Gothenburg&appid=a55a8434945c72a639d00f4164990b98";
    const result = await fetch(url);
    const data = await result.json();
    console.log(data);
}