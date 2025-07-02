// This uses visual crossing. In order to enable functionality you'll need to use a .env with your api key

async function queryWeather(location) {
    const queryString = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + String(location) + "?key=" + process.env.API_KEY + "&include=current";
    try {
        const response = await fetch(queryString);
        const weatherData = await response.json();
        handleDataResponse(location, weatherData.currentConditions);
    } catch (error) {
        console.error(error);
        handleQueryError(location);
    }
}

function handleDataResponse(loc, conditions) {
    console.log(conditions);

    const resSection = document.querySelector(".results");
    clearSection(resSection);
    const head = document.createElement("h2");
    head.textContent = "Weather for location: " + loc;
    resSection.appendChild(head);
    // Conditions
    const cond = conditions.conditions;
    const condText = document.createElement("p");
    condText.textContent = "Current Conditions: " + cond;
    resSection.appendChild(condText);
    // Temp
    const temp = conditions.temp;
    const tempText = document.createElement("p");
    tempText.textContent = "Temperature: " + temp + "\u00B0F";
    resSection.appendChild(tempText);

    // Humidity
    const humid = conditions.humidity;
    const humidText = document.createElement("p");
    humidText.textContent = "Humidity: " + humid + "%";
    resSection.appendChild(humidText);

    // Wind Speed
    const wind = conditions.windspeed;
    const windText = document.createElement("p");
    windText.textContent = "Wind: " + wind + " mph";
    resSection.appendChild(windText);

}

function handleQueryError(searchTerm) {
    const resultLoc = document.querySelector(".results");
    clearSection(resultLoc);
    const res = document.createElement("h2");
    res.textContent = "Error searching for location: " + searchTerm;
    resultLoc.appendChild(res);
    const subRes = document.createElement("p");
    subRes.textContent = "Please check that it is a valid location and try again.";
    resultLoc.appendChild(subRes);
}

function clearSection(section) {
    while (section.firstChild) {
        section.removeChild(section.lastChild);
    }
}

function handleNoInput() {
    const resultLoc = document.querySelector(".results");
    clearSection(resultLoc);
    const res = document.createElement("h2");
    res.textContent = "Please enter a location to search.";
    resultLoc.appendChild(res);
}

const submit = document.querySelector("form");
submit.addEventListener("submit", (event) => {
    event.preventDefault();
    const queryTerm = document.getElementById("loc");
    if (queryTerm.value.length == 0) {
        handleNoInput();
        return;
    }
    queryWeather(queryTerm.value);
})