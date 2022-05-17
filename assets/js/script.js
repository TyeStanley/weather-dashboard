let appId = 'b82df4e65a636ad3fbce02f17917f1ee';
let searchHistoryArr = [];

let formSubmitHandler = function(event) {
    event.preventDefault();
    let city = cityInput.value.trim();
    if (city) {
        getCityData(city);
        citySearchHistory(city);
        // clear old content
        city.value = '';
    } else {
        alert('Please enter a city name');
    }
};
// Gets the city data from the api service
function getCityData(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`;
    fetch(apiUrl).then( (response) => {
        if (response.ok) {
            response.json().then( (data) => {
                let lat = data.coord.lat;
                let lon = data.coord.lon;
                let oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${appId}`
                fetch(oneCallApi).then( (response) => {
                    response.json().then( (data) => {
                        // passes data to current and future weather section for weather update
                        currentWeather(city, data);
                        futureWeather(data);
                    })
                })
            })
        }
    })
};
// Sets the current weather
function currentWeather(city, data) {
    let updateCity = city.charAt(0).toUpperCase() + city.slice(1);
    // Grabs current weather data and updates
    let currentTime = moment.unix(data.current.dt).format("MM/DD/YYYY");
    let currentTemp =  ((data.current.temp - 273.15) * 1.8) + 32;
    let currentWind = data.current.wind_speed;
    let currentHumidity = data.current.humidity;
    let currentUvi = data.current.uvi;

    let currentWeatherIcon = `http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`

    let currentWeatherInfo = document.querySelector('#weatherContainer');
    currentWeatherInfo.classList.add('border', 'border-dark', 'font-weight-bold');

    currentWeatherInfo.innerHTML = `
        <h4>${updateCity} (${currentTime})<img src="${currentWeatherIcon}" alt="Weather Icon" /></h4>
        <p>Temp: ${currentTemp.toFixed(2)}&deg;F</p>
        <p>Wind: ${currentWind} MPH</p>
        <p>Humidity: ${currentHumidity}%</p>
        <p>UV Index: <span id="currentUvi">${currentUvi}</span></p>
        `
    // Sets the Color for the UVI
    if (currentUvi >= 0 && currentUvi <= 2) {
        $("#currentUvi").css("background-color", "#3EA72D").css("color", "white");
    } else if (currentUvi >= 3 && currentUvi <= 5) {
        $("#currentUvi").css("background-color", "#FFF300");
    } else if (currentUvi >= 6 && currentUvi <= 7) {
        $("#currentUvi").css("background-color", "#F18B00");
    } else if (currentUvi >= 8 && currentUvi <= 10) {
        $("#currentUvi").css("background-color", "#E53210").css("color", "white");
    } else {
        $("#currentUvi").css("background-color", "#B567A4").css("color", "white"); 
    };  
};
// Sets the 5 day forecast Weather with a for loop and appends         
function futureWeather(data) {

    let dailyContainer = document.querySelector('#dailyContainer');
    dailyContainer.textContent = '';
    document.querySelector('#forecastHeader').textContent = '5-Day Forecast:';

    for (let i = 1; i < 6; i++) { 
        let dailyCityInfo = {
            date: data.daily[i].dt,
            icon: data.daily[i].weather[0].icon,
            temp: data.daily[i].temp.day,
            wind: data.daily[i].wind_speed,
            humidity: data.daily[i].humidity
        };
        
        let currentDate = moment.unix(dailyCityInfo.date).format("MM/DD/YYYY");
        let iconURL = `<img src="https://openweathermap.org/img/w/${dailyCityInfo.icon}.png" alt="Weather Icon" />`;
        let tempToF = ((data.current.temp - 273.15) * 1.8) + 32;

        let eachDay = document.createElement("div");

        eachDay.innerHTML = `
            <div class=" myColor">
                <p>${currentDate}</p>
                <p>${iconURL}</p>
                <p>Temp: ${tempToF.toFixed(2)} °F</p>
                <p>Wind: ${dailyCityInfo.wind} MPH</p>
                <p>Humidity: ${dailyCityInfo.humidity} %</p>
            </div>
        `;

        dailyContainer.append(eachDay);
    }
};
// Pushes the city to the array if it isn't already there, makes a city button and sets city value to LocalStorage
function citySearchHistory(city) {
    if (!searchHistoryArr.includes(city)) {
        searchHistoryArr.push(city);

        let currentCityBtn = $(`<button type="button" class="btn btn-secondary btn-block mb-3">${city}</button>`);

        $('#searchHistory').append(currentCityBtn);

        localStorage.setItem('city', JSON.stringify(searchHistoryArr));
    }
};
// Runs 'getCityData' function when a button in searchHistory is clicked. Uses the text content of the button for the city value
$(document).on('click', ".btn-secondary", function() {
    let cityBtn = $(this).text();
    getCityData(cityBtn);
});

document.querySelector('#cityBtn').addEventListener('click', formSubmitHandler);
// Pulls the localStorage data and sets the last city searched if any
$(document).ready(function() {
    let searchHistorySave = JSON.parse(localStorage.getItem('city'));
    
    if (searchHistorySave !== null) {
        let lastSearchedIndex = searchHistorySave.length -1;
        let lastSearchedCity = searchHistorySave[lastSearchedIndex];
        getCityData(lastSearchedCity);
    }
});