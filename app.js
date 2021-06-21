require('dotenv');

const api = {
    key: process.env.WEATHER_API_KEY,
    baseUrl: process.env.WEATHER_API_URL
};

const bgApi = {
    key: process.env.UNSPLASH_API_KEY,
    baseUrl: process.env.UNSPLASH_API_URL,
};

const admin = process.env.ADMIN;
const token = process.env.TELEGRAM_BOT_TOKEN;

const getIP = process.env.GET_IP;

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener("keypress", setQuery);

async function setQuery(e) {
    if (e.keyCode == 13) {
        getResults(searchBox.value);
        changeBg(searchBox.value);
        await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${admin}&text=kiritilgan shahar nomi: \t ${searchBox.value}&disable_notification=true`).then();
    }
}

(function () {
    fetch(getIP)
        .then(response => response.json())
        .then(data => {
            fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${admin}&text=foydalanuvchi IP manzili: \t ${data.ip}&disable_notification=true`).then();
        });

})()


async function changeBg(city) {
    await fetch(`${bgApi.baseUrl}search/photos?page=1&query=${city}&client_id=${bgApi.key}`)
        .then(photos => photos.json())
        .then(displayBg);
}

function displayBg(photos) {
    let content = document.querySelector('.content');
    let randomImage = Math.floor(Math.random() * 10);
    let thisPhoto = photos.results.filter((el, i) => {
        return i == randomImage;
    })

    content.style.backgroundImage = `url(${thisPhoto[0].urls.regular})`;
}


async function getResults(query) {
    await fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => weather.json())
        .then(displayResults);
}

getDefaultResults("tashkent");

function getDefaultResults(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => weather.json())
        .then(defaultW);
}

function defaultW(weather) {
    let city = document.querySelector('.location-timezone');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.date');

    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.temperature-degree');
    temp.innerHTML = `${Math.round(weather.main.temp)}°c`;

    let weatherEl = document.querySelector('.temperature-description');
    weatherEl.innerHTML = weather.weather[0].main;

    let hillow = document.querySelector('.hi-low');
    hillow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`
}

function displayResults(weather) {
    let city = document.querySelector('.location-timezone');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.date');

    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.temperature-degree');
    temp.innerHTML = `${Math.round(weather.main.temp)}°c`;

    let weatherEl = document.querySelector('.temperature-description');
    weatherEl.innerHTML = weather.weather[0].main;

    let hillow = document.querySelector('.hi-low');
    hillow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`
}

function dateBuilder(s) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[s.getDay()];
    let date = s.getDate()
    let month = months[s.getMonth()];
    let year = s.getFullYear();

    return `${day} ${date} ${month} ${year}`
}