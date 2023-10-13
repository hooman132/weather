const weather_api = {
  key: "9ada6a9c73f1811b64a9ce25294caefc",
  url: "https://api.openweathermap.org/data/2.5/",
};
const searchbox = document.querySelector('[data-weather="input"]');
const city = document.querySelector('[data-weather="city"]');
const contry = document.querySelector('[data-weather="contry"]');
const type = document.querySelector('[data-weather="type"]');
const temp = document.querySelector('[data-weather="temp"]');
const max_min_temp = document.querySelector('[data-weather="max_min_temp"]');
const myModal = document.getElementById("exampleModal");

async function getWeather() {
  const cityValue = searchbox.value;
  // تبدیل حرف اول به حروف بزرگ
  const capitalizedCity =
    cityValue.charAt(0).toUpperCase() + cityValue.slice(1);
  const weatherResult = await fetch(
    `${weather_api.url}weather?q=${capitalizedCity}&appid=${weather_api.key}`
  );
  const weatherData = await weatherResult.json();
  console.log(weatherData);
  if (capitalizedCity === weatherData.name) {
    city.innerHTML = weatherData.name;
    type.innerHTML = weatherData.weather[0].description;
    const tempKelvin = weatherData.main.temp;
    const tempCelsius = tempKelvin - 273.15;
    temp.innerHTML = tempCelsius.toFixed(2) + " °C";

    const max_temp = weatherData.main.temp_max;
    const min_temp = weatherData.main.temp_min;
    const tempmaxCelsius = max_temp - 273.15;
    const tempminCelsius = min_temp - 273.15;

    max_min_temp.innerHTML = `Max: ${tempmaxCelsius.toFixed(
      2
    )} °C, Min: ${tempminCelsius.toFixed(2)} °C`;
    contry.innerHTML = weatherData.sys.country;
  } else {
    alert("Please enter the correct country name");
  }
}

// اجازه به کاربر برای اجرای دستور با فشردن Enter
searchbox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});
