// e71010db3c0c2012ee7a8a08e8f81863
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// // e71010db3c0c2012ee7a8a08e8f81863
// // key
// // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// // souce key

const weatherApi={
    key:"e71010db3c0c2012ee7a8a08e8f81863",
    baseUri:"https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox=document.getElementById('search');

searchInputBox.addEventListener('keypress',(event)=>{
    if(event.keyCode ==13){
        console.log(searchInputBox.value);
        getweatherReport(searchInputBox.value);
    }
});

// getweather Report
function getweatherReport(city){
    fetch(`${weatherApi.baseUri}?q=${city}&appid=${weatherApi.key}`)
    .then(weather=>{
        return weather.json();
    }).then(showweatherreport);
}
// show-weather Report
function showweatherreport(weather){
    console.log(weather);
    let city=document.getElementById('city');
    city.innerText=`${weather.name},${weather.sys.country}`;

    let temp=document.getElementById('temp');
    temp.innerHTML=`${(Math.round((weather.main.temp)-273.15))}&deg;C`;

    let min_max=document.getElementById('min-max');
    min_max.innerHTML=`${(Math.floor((weather.main.temp_min)-273.15))}&deg;C(min)/${(Math.ceil((weather.main.temp_max)-273.15))}&deg;C(max)`;

    let weatherType=document.getElementById('whether');
    weatherType.innerHTML=`${weather.weather[0].main}`;

    let date=document.getElementById('date');
    let todayDate=new Date();
    date.innerText=datemanage(todayDate);

    if(weatherType.textContent=='Clear'){
        document.body.style.backgroundImage="url('clear.jpg')"
    }
    if(weatherType.textContent=='Haze'){
        document.body.style.backgroundImage="url('haze.jpg')"
    }
    if(weatherType.textContent=='Rainy'){
        document.body.style.backgroundImage="url('rainy.jpg')"
    }
    if(weatherType.textContent=='Smoke'){
        document.body.style.backgroundImage="url('smoke.jpg')"
    }
}
// date manage
function datemanage(todayD){
    let days=["Sunday","Monday","Tuesday","Wednesday","thursday","Friday","Saturday"];

    let months=["January","February","March","April","May","June","July","August","September","Octomber","November","December"];

    let year=todayD.getFullYear();
    let month=months[todayD.getMonth()];
    let date=todayD.getDate();
    let day=days[todayD.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}