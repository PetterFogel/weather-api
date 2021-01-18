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

        displayLocalWeather(data);
    } catch(error) {
        handleError(error);
    }
}

function displayLocalWeather(data) {
    const local = document.querySelector(".location-text");
    local.innerText = data.timezone;
    console.log(local);

    const localTemp = document.querySelector(".temp-value");
    let kelvinTemp = data.current.temp;
    let celsiusTemp = Math.round(kelvinTemp - 273.15);
    localTemp.innerHTML = `${celsiusTemp}<span>&deg;</span>`;
    console.log(localTemp);

    const icon = data.current.weather[0].icon;
    const image = document.querySelector("img").src = `./assets/${icon}.png`;
    console.log(image);
}