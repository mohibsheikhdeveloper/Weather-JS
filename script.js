// Selecting DOM Elements
const cityInput = document.getElementById("cityInput")
const getWeatherBtn = document.querySelector("#getWeather")
const resultSection = document.getElementById("resultSection")
const displayCity = document.getElementById("displayCity")
const displayCountry = document.getElementById("displayCountry")
const displayTemp = document.getElementById("displayTemp")
const displayCondition = document.getElementById("displayCondition")
const displayHumidity = document.getElementById("displayHumidity")
const displayWindSpeed = document.getElementById("displayWindSpeed")
const displayLocalTime = document.getElementById("displayLocalTime")
const forecastTableBody = document.querySelector("#forecastTable")
const weatherIcon = document.getElementById("weatherIcon")
const historyTableBody = document.querySelector("#historyTableBody")

const historyData = {}

// Event Listener to Get Weather Button
getWeatherBtn.addEventListener("click", () => {
  let cityname = cityInput.value.trim().toLowerCase()

  if (cityname === "") {
    alert("Please Enter the Name of City")
  } else {
    const apiKey = `https://p2pclouds.up.railway.app/v1/learn/weather?city=${cityname}`
    FetchForecastData(apiKey)
    resultSection.hidden = false
  }
}) 

// Function to Display Weather Data from API
function FetchForecastData(apiKey) {
  fetch(apiKey).then((response) => {
    if (!response.ok) {
      alert("City Not Found! Please check the spelling.") 
    } else {
      response.json().then((data) => {
        // console.log(data) 
        const city = data.location.name
        const country = data.location.country
        const condition = data.current.condition.text
        const humidity = data.current.humidity
        const localTime = data.location.localtime
        const temp = data.current.temp_c
        const windSpeed = data.current.wind_mph
        const iconsrc = data.current.condition.icon

        DisplayForecastData(
          city,
          country,
          condition,
          humidity,
          localTime,
          temp,
          windSpeed,
          iconsrc,
        ) 

        historyForeCast(city, temp, condition, localTime)
      }) 
    }
  }) 
}

function DisplayForecastData(
  city,
  country,
  condition,
  humidity,
  localTime,
  temp,
  windSpeed,
  iconsrc,
) {
  displayCity.textContent = city + ", "
  displayCountry.textContent = country 
  weatherIcon.innerHTML = `<img src="${iconsrc}" alt="Weather Icon">`
  displayCondition.textContent = condition
  displayHumidity.textContent = humidity + " %"
  displayLocalTime.textContent = localTime
  displayTemp.textContent = temp 
  displayWindSpeed.textContent = windSpeed + " mph" 
  resultSection.hidden = false 

  console.log("Weather Data Displayed Successfully") 
}

function historyForeCast(city, temp, condition, localTime) {
  const key = city.toLowerCase() 
  historyData[key] = {
    city: city,
    temp: temp,
    condition: condition,
    localTime: localTime,
  } 
  RenderHistoryTable() 
}
// Data is stored in form of JSON objects
function RenderHistoryTable() {
  historyTableBody.innerHTML = "" 

  for (let key in historyData) {
    const item = historyData[key] 
    //Key is the City Name through which we will get the data from historyData object
    const row = document.createElement("tr") 

    row.innerHTML = `<td> ${item.city} </td>
                 <td> ${item.temp} °C </td>
                 <td> ${item.condition} </td>
                 <td> ${item.localTime} </td>` 
    historyTableBody.appendChild(row) 
    console.log("item:", item) 
  }
}