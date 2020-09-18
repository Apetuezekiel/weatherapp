// -nN;
//Variables
let timeZone = document.querySelector(".timeZone");
let temp = document.querySelector(".temp");
let unit = document.querySelector(".unit");
let tempHub = document.querySelector(".tempHub");
let descr = document.querySelector(".description");
let icon = document.querySelector(".icon");
let searchBtn = document.querySelector(".searchBtn");
let searchField = document.querySelector("#search");
let searchHub = document.querySelector("#searchHub");
let searchHistory = document.querySelector(".searchHistory");
let mainContainer = document.querySelector(".mainContainer");
let errorMessage = document.querySelector(".errorMessage");

const KELVIN = 273.15;

//GET USER LOCATION
window.addEventListener("load", () => {
  unit.innerHTML = "-";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, displayError);
  }
});

//SET POSITION
function setPosition(position) {
  let { longitude, latitude } = position.coords;
  grabWeatherStat(longitude, latitude);
}

function displayError(error) {
  mainContainer.style.display = "none";
  errorMessage.innerHTML =
    `<span>Oops  <img class="cloud2" src="/icons/oops3.png" alt="cloud" /><span/> ` +
    error.message;
}

function grabWeatherStat(longitude, latitude) {
  const key = "3e6712931ad925f6e79aa4684f09114c";
  const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${key}
`;
  fetch(api)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((data) => {
      timeZone.innerHTML = data.timezone;
      temp.innerHTML = Math.floor(data.current.temp - KELVIN);
      unit.innerHTML = "C";
      descr.innerHTML = data.current.weather[0].description;
      let grabIcon = data.current.weather[0].icon;
      icon.innerHTML = `<img class="cloud" src="/icons/${grabIcon}.png" alt="cloud" />`;
    });
}

// UNIT COVERSION
let flipper = true;
tempHub.addEventListener("click", () => {
  let degree = temp.innerHTML;
  if (degree === "-") {
    return;
  } else {
    if (flipper) {
      let faren = (degree * 9) / 5 + 32;
      temp.innerHTML = Math.floor(faren);
      unit.innerHTML = "F";
      flipper = false;
      console.log("degree celcius", degree);
      console.log(faren);
    } else if (flipper === false) {
      console.log("DEGREE fare", degree);
      let celcius = (degree - 32) * (5 / 9);
      temp.innerHTML = Math.floor(celcius);
      unit.innerHTML = "C";
      console.log(celcius);
      flipper = true;
    }
  }
});

if (navigator.serviceWorker) {
  console.log("service worker: supported");
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("registered"))
      .catch((err) => console.log(err));
  });
}

let counter = "";
searchBtn.addEventListener("click", () => {
  let area = document.querySelector("#search").value;

  //STORE AD /
  localStorage.setItem("areaValue", area);
  getStoredSearch = localStorage.getItem("areaValue");
  for (let i = 1; i < 5; i++) {
    counter += i;
    let searchHistoryContent = `<div class="searchResults search${counter}">${getStoredSearch}<div/>`;
    searchHistory.innerHTML += searchHistoryContent;
    break;
  }

  if (area === "") return;
  const key = "3e6712931ad925f6e79aa4684f09114c";
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${area}&appid=${key}`;
  console.log("////////", api);
  fetch(api)
    .then((response) => {
      let data2 = response.json();
      return data2;
    })
    .then((data2) => {
      let { lat, lon } = data2.coord;
      grabWeatherStat(lon, lat);
      console.log(lat);
    });
});

searchField.addEventListener("click", () => {
  if (searchHistory.innerHTML === "") {
    searchHistory.style.display = "transparent";
    console.log("search", searchHistory.innerHTML);
  } else {
    searchHistory.style.display = "block";
    event.stopPropagation();
  }
});

window.addEventListener("click", () => {
  searchHistory.style.display = "none";
});
