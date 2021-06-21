const api = {
    key: '2f50a78242c901b2d7a3f6a2f78c7ae1',
    baseUrl: "https://api.openweathermap.org/data/2.5/"
};

const bgApi = {
    key: 'sApxRGnLoIJZyxgk2DQ31fAmUiwd8kHyZuVSG2pvvhY',
    baseUrl: 'https://api.unsplash.com/',
}

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
    if (e.keyCode == 13) {
        getResults(searchBox.value);
        changeBg(searchBox.value);
    }
}

function changeBg(city) {
    fetch(`${bgApi.baseUrl}search/photos?page=1&query=${city}&client_id=${bgApi.key}`)
        .then(photos => photos.json())
        .then(displayBg);
}

function displayBg(photos) {
    let content = document.querySelector('.content');
    let randomImage = Math.floor(Math.random() * 10);
    let thisPhoto = photos.results.filter((el, i) => {
        return i == randomImage
    })
    
    content.style.backgroundImage = `url(${thisPhoto[0].links.download})`;
}


function getResults(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
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












// window.addEventListener('load', () => {
//     let long;
//     let lat;

//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition( position => {
//             long = position.coords.longitude;
//             lat = position.coords.latitude;

//             const proxy = "https://cors-anywhere.herokuapp.com/"
//             const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

//          fetch(api)
//             .then(response => {
//                  return response.json()
//             })
//                 .then(async data => {
//                   await console.log(data)
//              })
//         })
//     }
// })

// const ism = 'farid';
// const surname = 'anuvarov';
// const age = 21;
// const student = true;
// const work = true;
// const birth = '01.03.1999';

// console.log('ism :>> ', ism);
// console.log('surname :>> ', surname);

