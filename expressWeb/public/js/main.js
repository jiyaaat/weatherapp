﻿const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const tempstatus = document.getElementById('temp_status');
const deg = document.getElementById('deg');
const datahide = document.querySelector('.middle_layer');

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = `please write name before search`;
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=ur apiid`;

            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            console.log('Response:', response);
            console.log('Data:', data); // Add this line to log the API response data

            deg.innerText = arrData[0].main.temp;
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

            const tempMood = arrData[0].weather[0].main;

            if (tempMood === "Clear") {
                tempstatus.innerHTML = "<i class='fas fa-sun' style='color: #eccc68'></i>";
            } else if (tempMood === "Clouds") {
                tempstatus.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6'></i>";
            } else if (tempMood === "Rain") {
                tempstatus.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be'></i>";
            } else {
                tempstatus.innerHTML = "<i class='fas fa-cloud' style='color: #44c3de'></i>";
            }
            datahide.classList.remove('data_hide');
        } catch (error) {
            console.error('Error:', error);
            city_name.innerText = `please write name properly`;
            datahide.classList.add('data_hide');
        }
    }
}

submitBtn.addEventListener('click', getInfo);
