// -nN;

let timeZone = document.querySelector(".timeZone");
let temp = document.querySelector(".temp");
let descr = document.querySelector(".description");
let icon = document.querySelector(".icon");
const KELVIN = 273.15;

//GET USER LOCATION
window.addEventListener("load", () => {
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
  error.message;
}

function grabWeatherStat(longitude, latitude) {
  const key = "3e6712931ad925f6e79aa4684f09114c";
  console.log(longitude, latitude);
  const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${key}
`;
  console.log(api);
  fetch(api)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((data) => {
      timeZone.innerHTML = data.timezone;
      temp.innerHTML = Math.floor(data.current.temp - KELVIN);
      descr.innerHTML = data.current.weather[0].description;
      let grabIcon = data.current.weather[0].icon;
      icon.innerHTML = `<img class="cloud" src="/icons/${grabIcon}.png" alt="cloud" />`;
    });
}
let flipper = true;
let convertbtn = document.querySelector(".convertbtn");
convertbtn.addEventListener("click", (convertDeg) => {
  let sampleDeg = 100;
  if (flipper === true) {
    let faren = ((sampleDeg - 32) * 5) / 9;
    flipper = false;
    console.log(faren);
  } else if (flipper === false) {
    let faren = (sampleDeg / 5) * 9 + 32;
    console.log(faren);
    flipper = true;
  }
});
console.log("..................................////////////////////////////");

if (navigator.serviceWorker) {
  console.log("service worker: supported");
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("registered"))
      .catch((err) => console.log(err));
  });
}

const api2 = "https://maps.googleapis.com/maps/api/geocode/json";
let area = "lagos";
function location2(city) {
  const key = "3e6712931ad925f6e79aa4684f09114c";
  const api = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  fetch(api)
    .then((response) => {
      let data2 = response.json();
      return data2;
    })
    .then((data2) => {
      console.log(data2.timezone);
    });
}

location2();
