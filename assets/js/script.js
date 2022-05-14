// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// References for form section
let cityFormEl = document.querySelector('#cityForm');
let nameInputEl = document.querySelector('#cityName')
let cityBtn = document.querySelector('#cityBtn');
// 
let currentWeather = document.querySelector('#weatherContainer');
// 5 Day Section
let forecastContainerEl = document.querySelector('#forecastContainer');
let day1ContainerEl = document.getElementById('day1');
let day2ContainerEl = document.getElementById('day2');
let day3ContainerEl = document.getElementById('day3');
let day4ContainerEl = document.getElementById('day4');
let day5ContainerEl = document.getElementById('day5');

let cityHistoryEl = document.getElementById('cityHistory');
let buttonEl = document.createElement('button');


function cityHistoryBtn(event) {
    event.preventDefault();
    console.log(buttonEl.textContent);
    let cityName2 = buttonEl.textContent
    if (cityName2) {
        currentWeather.textContent = '';
        getCityData(cityName2);
        // clear old content
        
    }
}

let formSubmitHandler = function(event) {
    event.preventDefault();
    let city = nameInputEl.value.trim();
    if (city) {
        getCityData(city);
        // clear old content
        nameInputEl.value = '';

    } else {
        alert('Please enter a city name');
    }
};

let getCityData = function(city) { // function getCityData(city) 
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b82df4e65a636ad3fbce02f17917f1ee`;
    fetch(apiUrl) // Fetches the api data with the city from the input
        .then(function(response) { // Takes the data recieved as the "response" parameter
            if (response.ok) { // if response comes back as 'ok' preceed to do steps in code block
                response.json().then(function(data) { // parse response into a JavaScript object using .json() method
                    // use data here to post to page
                    let secondApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=b82df4e65a636ad3fbce02f17917f1ee`
                    fetch(secondApi).then(function(response) {
                        response.json().then(function(data) {
                            // console log the data
                            //console.log(data);
                            dataTest(data);
                            //START OF CURRENT WEATHER

                            // Clears content 
                            currentWeather.textContent = '';
                            day1ContainerEl.textContent = '';
                            day2ContainerEl.textContent = '';
                            day3ContainerEl.textContent = '';
                            day4ContainerEl.textContent = '';
                            day5ContainerEl.textContent = '';
                            
                            // Grabs and formats the date
                            let time = data.current.dt;
                            let properTime = moment.unix(time).format("MM/DD/YYYY");
                            let currentDate = document.createElement("h2");
                            let updateCity = city.charAt(0).toUpperCase() + city.slice(1);
                            currentDate.textContent = `${updateCity} ${properTime}`;
                            
                            // Grabs the temperature
                            let temp = data.current.temp;
                            let tempParagraph = document.createElement('p');
                            tempParagraph.textContent = `Temp: ${temp}`;
                            
                            // Grabs the wind speed
                            let windSpeed = data.current.wind_speed;
                            let windParagraph = document.createElement('p');
                            windParagraph.textContent = `Wind: ${windSpeed}`;

                            // Grabs the humidity
                            let humidity = data.current.humidity;
                            let humidityParagraph = document.createElement('p');
                            humidityParagraph.textContent = `Humidity: ${humidity}`;

                            // Grabs the UV index
                            let uvi = data.current.uvi;
                            let uviParagraph = document.createElement('p');
                            uviParagraph.textContent = `UV index: ${uvi}`;

                            // appends content
                            currentWeather.appendChild(currentDate);
                            currentWeather.appendChild(tempParagraph);
                            currentWeather.appendChild(windParagraph);
                            currentWeather.appendChild(humidityParagraph);
                            currentWeather.appendChild(uviParagraph);
                            // END OF CURRENT WEATHER

                            // DAY 1
                            // create elements
                            let createDateElDay1 = document.createElement('h5');
                            let createTempElDay1 = document.createElement('p');
                            let createWindElDay1 = document.createElement('p');
                            let createHumidityElDay1 = document.createElement('p');
                            // apply textContent
                            createDateElDay1.textContent = moment.unix(data.daily[1].dt).format("MM/DD/YYYY");
                            createTempElDay1.textContent = `Temp: ${data.daily[1].temp.day}`;
                            createWindElDay1.textContent = `Wind: ${data.daily[1].wind_speed}`;
                            createHumidityElDay1.textContent = `Humidity: ${data.daily[1].humidity}`;
                            // image element
                            let createIconDivDay1 = document.createElement('div')
                            let createIconImgDay1 = document.createElement('img')
                            createIconImgDay1.setAttribute('src', `http://openweathermap.org/img/w/${data.daily[1].weather[0].icon}.png`)
                            // Append them to page
                            day1ContainerEl.appendChild(createDateElDay1);
                            day1ContainerEl.appendChild(createIconDivDay1);
                            day1ContainerEl.appendChild(createIconImgDay1);
                            day1ContainerEl.appendChild(createTempElDay1);
                            day1ContainerEl.appendChild(createWindElDay1);
                            day1ContainerEl.appendChild(createHumidityElDay1);
                            // END OF DAY 1

                            // DAY 2
                            let createDateElDay2 = document.createElement('h5');
                            let createTempElDay2 = document.createElement('p');
                            let createWindElDay2 = document.createElement('p');
                            let createHumidityElDay2 = document.createElement('p')
                            // apply textContent
                            createDateElDay2.textContent = moment.unix(data.daily[2].dt).format("MM/DD/YYYY");
                            createTempElDay2.textContent = `Temp: ${data.daily[2].temp.day}`;
                            createWindElDay2.textContent = `Wind: ${data.daily[2].wind_speed}`;
                            createHumidityElDay2.textContent = `Humidity: ${data.daily[2].humidity}`;
                            // image element
                            let createIconDivDay2 = document.createElement('div')
                            let createIconImgDay2 = document.createElement('img')
                            createIconImgDay2.setAttribute('src', `http://openweathermap.org/img/w/${data.daily[2].weather[0].icon}.png`)
                            // Append them to page
                            day2ContainerEl.appendChild(createDateElDay2);
                            day2ContainerEl.appendChild(createIconDivDay2);
                            day2ContainerEl.appendChild(createIconImgDay2);
                            day2ContainerEl.appendChild(createTempElDay2);
                            day2ContainerEl.appendChild(createWindElDay2);
                            day2ContainerEl.appendChild(createHumidityElDay2);
                            // END OF DAY 2

                            // DAY 3
                            let createDateElDay3 = document.createElement('h5');
                            let createTempElDay3 = document.createElement('p');
                            let createWindElDay3 = document.createElement('p');
                            let createHumidityElDay3 = document.createElement('p')
                            // apply textContent
                            createDateElDay3.textContent = moment.unix(data.daily[3].dt).format("MM/DD/YYYY");
                            createTempElDay3.textContent = `Temp: ${data.daily[3].temp.day}`;
                            createWindElDay3.textContent = `Wind: ${data.daily[3].wind_speed}`;
                            createHumidityElDay3.textContent = `Humidity: ${data.daily[3].humidity}`;
                            // image element
                            let createIconDivDay3 = document.createElement('div')
                            let createIconImgDay3 = document.createElement('img')
                            createIconImgDay3.setAttribute('src', `http://openweathermap.org/img/w/${data.daily[3].weather[0].icon}.png`)
                            // Append them to page
                            day3ContainerEl.appendChild(createDateElDay3);
                            day3ContainerEl.appendChild(createIconDivDay3);
                            day3ContainerEl.appendChild(createIconImgDay3);
                            day3ContainerEl.appendChild(createTempElDay3);
                            day3ContainerEl.appendChild(createWindElDay3);
                            day3ContainerEl.appendChild(createHumidityElDay3);
                            // END OF DAY 3

                            // DAY 4
                            let createDateElDay4 = document.createElement('h5');
                            let createTempElDay4 = document.createElement('p');
                            let createWindElDay4 = document.createElement('p');
                            let createHumidityElDay4 = document.createElement('p')
                            // apply textContent
                            createDateElDay4.textContent = moment.unix(data.daily[4].dt).format("MM/DD/YYYY");
                            createTempElDay4.textContent = `Temp: ${data.daily[4].temp.day}`;
                            createWindElDay4.textContent = `Wind: ${data.daily[4].wind_speed}`;
                            createHumidityElDay4.textContent = `Humidity: ${data.daily[4].humidity}`;
                            // image element
                            let createIconDivDay4 = document.createElement('div')
                            let createIconImgDay4 = document.createElement('img')
                            createIconImgDay4.setAttribute('src', `http://openweathermap.org/img/w/${data.daily[4].weather[0].icon}.png`)
                            // Append them to page
                            day4ContainerEl.appendChild(createDateElDay4);
                            day4ContainerEl.appendChild(createIconDivDay4);
                            day4ContainerEl.appendChild(createIconImgDay4);
                            day4ContainerEl.appendChild(createTempElDay4);
                            day4ContainerEl.appendChild(createWindElDay4);
                            day4ContainerEl.appendChild(createHumidityElDay4);
                            // END OF DAY 4

                            // DAY 5
                            let createDateElDay5 = document.createElement('h5');
                            let createTempElDay5 = document.createElement('p');
                            let createWindElDay5 = document.createElement('p');
                            let createHumidityElDay5 = document.createElement('p')
                            // apply textContent
                            createDateElDay5.textContent = moment.unix(data.daily[5].dt).format("MM/DD/YYYY");
                            createTempElDay5.textContent = `Temp: ${data.daily[5].temp.day}`;
                            createWindElDay5.textContent = `Wind: ${data.daily[5].wind_speed}`;
                            createHumidityElDay5.textContent = `Humidity: ${data.daily[5].humidity}`;
                            // image element
                            let createIconDivDay5 = document.createElement('div')
                            let createIconImgDay5 = document.createElement('img')
                            createIconImgDay5.setAttribute('src', `http://openweathermap.org/img/w/${data.daily[5].weather[0].icon}.png`)
                            // Append them to page
                            day5ContainerEl.appendChild(createDateElDay5);
                            day5ContainerEl.appendChild(createIconDivDay5);
                            day5ContainerEl.appendChild(createIconImgDay5);
                            day5ContainerEl.appendChild(createTempElDay5);
                            day5ContainerEl.appendChild(createWindElDay5);
                            day5ContainerEl.appendChild(createHumidityElDay5);
                            // END OF DAY 5

                            // Creates, names current city and appends the button to City History
                            
                            console.dir(cityHistoryEl);
                        
                           
                        })
                    })
                });
            } else { // alert if error occurs
                alert(`Error: ${response.statusText}`);
            }
        })
        .catch(function(error) {
            alert('Unable to fetch weather data');
        })
}

function dataTest(data) {
    console.log(data);
    console.log(data.current.dt);
}


$(cityHistoryEl).on('click', buttonEl, cityHistoryBtn);
cityFormEl.addEventListener("submit", formSubmitHandler);

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
