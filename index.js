

const search = document.querySelector('.input-field');
const results = document.querySelector('.results');
const currentTemp = document.querySelector('.current-temp');
const curLocation = document.querySelector('.location');
const windSpeed = document.querySelector('.wind-speed');
const feelsLike = document.querySelector('.feels-like');
const humidity = document.querySelector('.humidity');
const precipitation = document.querySelector('.precipitation');
const maxTemp = document.querySelectorAll('.max-temp');
const minTemp = document.querySelectorAll('.min-temp');
const dailyDays = document.querySelectorAll('.d-day');
const nameC = document.querySelector('.nameC');
const countryN = document.querySelector('.countryN');
const tzDate = document.querySelector('.date');
const subCategory = document.querySelectorAll('.sub-cat');
const subCatSingle = document.querySelector('.sub-cat')
const subMetric = document.querySelectorAll('.sub-met');
const subImperial = document.querySelectorAll('.sub-imp');
const subCel = document.querySelector('.sub-cel');
const subFah = document.querySelector('.sub-fah');
const subKmh = document.querySelector('.sub-kmh');
const subMph = document.querySelector('.sub-mph');
const subMm = document.querySelector('.sub-mm');
const subIn = document.querySelector('.sub-in');
const hourlyTemperature = document.querySelectorAll('.h-temp');
const switchDiff = document.querySelector('.switch');
const selectedDayD = document.querySelector('.day');
const selectedDayDAll = document.querySelectorAll('.day')
const currentTempImg = document.querySelector('.current-temp-img');
const dailyIcon = document.querySelectorAll('.daily-icon');
const hourlyIcon = document.querySelectorAll('.hourly-icon');
const dayDropdown = document.querySelector('.day-dropdown-btn');
const hourlyTime = document.querySelectorAll('.hourly-time');
const lNameDate = document.querySelector('.lname-date');
const weatherTemp = document.querySelector('.weather-temp');
const bgLarge = document.querySelector('.bg-large');
const loading = document.querySelector('.loading');
const bgSmall = document.querySelector('.bg-small');
const locationTemp = document.querySelector('.location-temp');
const wrapper = document.querySelector('.wrapper');
const noResult = document.querySelector('.no-search-result')
const hero = document.querySelector('.hero');
const error = document.querySelector('.err-api-container');


let lat;
let lon;
let locName;
let countryName;
let selectedDayHours;
let daily = 0;


document.addEventListener('click', (e) => {
    const units = e.target.closest('.units');
    const day = e.target.closest('.day-dropdown-btn');
    const subCat = e.target.closest('.sub-cat');
    const switchUnits = e.target.closest('.switch');
    const selectedDay = e.target.closest('.day');
    const searchButton = e.target.closest('.search-btn');
    const selectedResult = e.target.closest('.search-results');
    const tempSwitch = e.target.closest('.cat-temp');

    if(units){
        document.querySelector('.units-dropdown').classList.toggle('showF');
        document.querySelector('.day-dropdown').classList.remove('showF');
    }

    if(day){
        document.querySelector('.day-dropdown').classList.toggle('showF');
    }

    if(subCat){
        const temp = subCat.closest('.cat-temp');
        const windS = subCat.closest('.cat-ws');
        const prec = subCat.closest('.cat-prec');
        
        if(temp){
            temp.querySelectorAll('.sub-cat').forEach(btn =>{
                btn.classList.remove('selected')
                btn.setAttribute('aria-checked','false');
            });  

        }else if(windS){
            windS.querySelectorAll('.sub-cat').forEach(btn =>{
                btn.classList.remove('selected')
                btn.setAttribute('aria-checked','false');
            });    
        }else{
            prec.querySelectorAll('.sub-cat').forEach(btn =>{
                btn.classList.remove('selected')
                btn.setAttribute('aria-checked','false');
            });  
        }

        subCat.classList.add('selected');
        subCat.setAttribute('aria-checked','true');

        if(subCat.dataset.value === "f"){
                const now = new Date();
                const currentHour = now.toISOString().slice(0, 13);
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=weather_code&hourly=temperature_2m&temperature_unit=fahrenheit&hourly=wind_speed_10m&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&&daily=temperature_2m_max&daily=temperature_2m_min`)
                .then(res => res.json())
                .then(data => {

                    const index = data.hourly.time.findIndex(t => t.startsWith(currentHour));
                    let maxV = 0;
                    let minV = 0;

                    currentTemp.textContent = data.hourly.temperature_2m[index] + "°";
                    feelsLike.textContent = data.hourly.apparent_temperature[index] + "°";
                    maxTemp.forEach(max =>{
                        max.textContent = data.daily.temperature_2m_max[maxV] + "°";
                        maxV += 1;
                        max.style.fontSize = ".73rem";
                    });

                    minTemp.forEach(min =>{
                        min.textContent = data.daily.temperature_2m_min[minV] + "°";
                        minV += 1;
                        min.style.fontSize = ".73rem";
                    });

                    if(dayDropdown.dataset.currentday === selectedDayDAll[0].dataset.day){
                        selectedDayHours = 0;
                        selectedHourly = 0;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[1].dataset.day){
                        selectedDayHours = 24;
                        selectedHourly = 24;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[2].dataset.day){
                        selectedDayHours = 48;
                        selectedHourly = 48;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[3].dataset.day){
                        selectedDayHours = 72;
                        selectedHourly = 72;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[4].dataset.day){
                        selectedDayHours = 96;
                        selectedHourly = 96;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[5].dataset.day){
                        selectedDayHours = 120;
                        selectedHourly = 120;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[6].dataset.day){
                        selectedDayHours = 144;
                        selectedHourly = 144;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                    }
                });
            }else if(subCat.dataset.value === "c"){
                const now = new Date();
                const currentHour = now.toISOString().slice(0, 13);
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=weather_code&hourly=temperature_2m&temperature_unit=celsius&hourly=wind_speed_10m&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&&daily=temperature_2m_max&daily=temperature_2m_min`)
                .then(res => res.json())
                .then(data => {

                    const index = data.hourly.time.findIndex(t => t.startsWith(currentHour));
                    let maxV = 0;
                    let minV = 0;

                    currentTemp.textContent = data.hourly.temperature_2m[index] + "°";
                    feelsLike.textContent = data.hourly.apparent_temperature[index] + "°";
                    maxTemp.forEach(max =>{
                        max.textContent = data.daily.temperature_2m_max[maxV] + "°";
                        maxV += 1;
                        max.style.fontSize = ".73rem";
                    });

                    minTemp.forEach(min =>{
                        min.textContent = data.daily.temperature_2m_min[minV] + "°";
                        minV += 1;
                        min.style.fontSize = ".73rem";
                    });

                    if(dayDropdown.dataset.currentday === selectedDayDAll[0].dataset.day){
                        selectedDayHours = 0;
                        selectedHourly = 0;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[1].dataset.day){
                        selectedDayHours = 24;
                        selectedHourly = 24;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[2].dataset.day){
                        selectedDayHours = 48;
                        selectedHourly = 48;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[3].dataset.day){
                        selectedDayHours = 72;
                        selectedHourly = 72;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[4].dataset.day){
                        selectedDayHours = 96;
                        selectedHourly = 96;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[5].dataset.day){
                        selectedDayHours = 120;
                        selectedHourly = 120;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[6].dataset.day){
                        selectedDayHours = 144;
                        selectedHourly = 144;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                    }
                });
            }else if(subCat.dataset.value === "kmh"){
                const now = new Date();
                const currentHour = now.toISOString().slice(0, 13);
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&hourly=wind_speed_10m&wind_speed_unit=kmh&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&&daily=temperature_2m_max&daily=temperature_2m_min`)
                .then(res => res.json())
                .then(data => {

                    const index = data.hourly.time.findIndex(t => t.startsWith(currentHour));
                    windSpeed.textContent = data.hourly.wind_speed_10m[index] + " km/h";
                });
            }else if(subCat.dataset.value === "mph"){
                const now = new Date();
                const currentHour = now.toISOString().slice(0, 13);
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&hourly=wind_speed_10m&wind_speed_unit=mph&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&&daily=temperature_2m_max&daily=temperature_2m_min`)
                .then(res => res.json())
                .then(data => {

                    const index = data.hourly.time.findIndex(t => t.startsWith(currentHour));
                    windSpeed.textContent = data.hourly.wind_speed_10m[index] + " mph";
                });
            }else if(subCat.dataset.value === "mm"){
                const now = new Date();
                const currentHour = now.toISOString().slice(0, 13);
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&hourly=wind_speed_10m&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&precipitation_unit=mm&daily=temperature_2m_max&daily=temperature_2m_min`)
                .then(res => res.json())
                .then(data => {

                    const index = data.hourly.time.findIndex(t => t.startsWith(currentHour));
                    precipitation.textContent = data.hourly.precipitation[index] + " mm";
                });
            }else if(subCat.dataset.value === "in"){
                const now = new Date();
                const currentHour = now.toISOString().slice(0, 13);
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&hourly=wind_speed_10m&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&precipitation_unit=inch&daily=temperature_2m_max&daily=temperature_2m_min`)
                .then(res => res.json())
                .then(data => {

                    const index = data.hourly.time.findIndex(t => t.startsWith(currentHour));
                    precipitation.textContent = data.hourly.precipitation[index] + " in";
                });
            }
    }
    
    if(selectedResult){
         
        results.classList.remove('showF');
        lNameDate.classList.remove('hide');
        weatherTemp.classList.remove('hide');
        bgLarge.classList.remove('hide');
        loading.classList.add('hide');
        bgSmall.classList.add('show');
        locationTemp.classList.remove('center')

        
        hourlyTime.forEach(ht => {
            ht.classList.remove('hide');
        });

        lat = selectedResult.dataset.lat;
        lon = selectedResult.dataset.lon;
        locName = selectedResult.dataset.name;
        countryName = selectedResult.dataset.country;

        nameC.textContent = `${locName}` + ",";
        countryN.textContent = `${countryName}`;

        const now = new Date();
        const currentHour = now.toISOString().slice(0, 13);
        console.log(now);
        

        console.log(lat, lon)
        
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=weather_code&daily=weather_code&hourly=temperature_2m&temperature_unit=celsius&hourly=wind_speed_10m&wind_speed_unit=kmh&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&precipitation_unit=mm&daily=temperature_2m_max&daily=temperature_2m_min`)
            .then(res => res.json())
            .then(data => {
                wrapper.classList.remove('hide');
                const index = data.hourly.time.findIndex(t => t.startsWith(currentHour));
                let maxV = 0;
                let minV = 0;
                let days = 0;
                let dayh = 0;
                daily = 0;
                console.log(daily)

                const currrentDay = new Date();
                const currTzWDay = currrentDay.toLocaleDateString("en-US", {weekday:"long", timeZone: data.timezone});
                const currTzMonth = currrentDay.toLocaleDateString("en-US", {month:"short", timeZone: data.timezone});
                const currTzDay = currrentDay.toLocaleDateString("en-US", {day:"numeric", timeZone: data.timezone});
                const currTzYear = currrentDay.toLocaleDateString("en-US", {year:"numeric", timeZone: data.timezone});
                tzDate.textContent = `${currTzWDay}, ${currTzMonth} ${currTzDay}, ${currTzYear}`
                console.log(data);



                dailyDays.forEach(dayd =>{
                    const date = new Date(data.daily.time[days]);
                    const curDay = date.toLocaleDateString("en-US", {weekday: "short", timeZone: data.timezone});
                    
                    dayd.textContent = `${curDay}`;

                    console.log(curDay, data.name)

                    days += 1;
                });

                
                const dropdownDay = currrentDay.toLocaleDateString("en-US", {weekday: "long", timeZone: data.timezone});
                dayDropdown.dataset.currentday = dropdownDay;
                dayDropdown.innerHTML = `${dropdownDay} <img src="./assets/images/icon-dropdown.svg" alt="">`;

                selectedDayDAll.forEach(sd => {
                    const date = new Date(data.daily.time[dayh]);
                    const curDay = date.toLocaleDateString("en-US", {weekday: "long", timeZone: data.timezone});

                    sd.textContent = `${curDay}`;
                    sd.dataset.day = curDay;
                    dayh += 1;
                });
                
                dailyIcon.forEach(dIcon => {
                    if([0,1].includes(data.daily.weather_code[daily])){
                        dIcon.src = "./assets/images/icon-sunny.webp";
                    }else if([2].includes(data.daily.weather_code[daily])){
                        dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                    }else if(data.daily.weather_code[daily] === 3){
                        dIcon.src = "./assets/images/icon-overcast.webp";
                    }else if([45,48].includes(data.daily.weather_code[daily])){
                        dIcon.src = "./assets/images/icon-fog.webp";
                    }else if([51,53,55,56,57].includes(data.daily.weather_code[daily])){
                        dIcon.src = "./assets/images/icon-drizzle.webp";
                    }else if([61,63,65,66,67,80,81,82].includes(data.daily.weather_code[daily])){
                        dIcon.src = "./assets/images/icon-rain.webp";
                    }else if([71,73,75,77,85,86].includes(data.daily.weather_code[daily])){
                        dIcon.src = "./assets/images/icon-snow.webp";
                    }else if([95,96,99].includes(data.daily.weather_code[daily])){
                        dIcon.src = "./assets/images/icon-storm.webp";
                    }
                    daily += 1;
                });

                if(switchDiff.dataset.unit === "metric"){
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=weather_code&hourly=temperature_2m&temperature_unit=celsius&hourly=wind_speed_10m&wind_speed_unit=kmh&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&precipitation_unit=mm&daily=temperature_2m_max&daily=temperature_2m_min`)
                .then(res => res.json())
                .then(data => {

                    currentTemp.textContent = data.hourly.temperature_2m[index] + "°";
                    windSpeed.textContent = data.hourly.wind_speed_10m[index] + " km/h";
                    feelsLike.textContent = data.hourly.apparent_temperature[index] + "°";
                    humidity.textContent = data.hourly.relative_humidity_2m[index] + "%";
                    precipitation.textContent = data.hourly.precipitation[index] + " mm";

                    maxTemp.forEach(max =>{
                        max.textContent = data.daily.temperature_2m_max[maxV] + "°";
                        maxV += 1;
                        max.style.fontSize = ".73rem";
                    });

                    minTemp.forEach(min =>{
                        min.textContent = data.daily.temperature_2m_min[minV] + "°";
                        minV += 1;
                        min.style.fontSize = ".73rem"; 
                    });

                    if(dayDropdown.dataset.currentday === selectedDayDAll[0].dataset.day){
                        
                        selectedDayHours = 0;
                        selectedHourly = 0;
                        console.log(selectedHourly);
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                            if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-sunny.webp";
                            }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                            }else if(data.hourly.weather_code[selectedHourly] === 3){
                                dIcon.src = "./assets/images/icon-overcast.webp";
                            }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-fog.webp";
                            }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-drizzle.webp";
                            }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-rain.webp";
                            }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-snow.webp";
                            }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-storm.webp";
                            }
                            selectedHourly += 1;
                        });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[1].dataset.day){
                        
                        selectedDayHours = 24;
                        selectedHourly = 24;
                        console.log(selectedHourly);
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                            if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-sunny.webp";
                            }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                            }else if(data.hourly.weather_code[selectedHourly] === 3){
                                dIcon.src = "./assets/images/icon-overcast.webp";
                            }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-fog.webp";
                            }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-drizzle.webp";
                            }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-rain.webp";
                            }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-snow.webp";
                            }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-storm.webp";
                            }
                            selectedHourly += 1;
                        });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[2].dataset.day){
                        selectedDayHours = 48;
                        selectedHourly = 48;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                            if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-sunny.webp";
                            }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                            }else if(data.hourly.weather_code[selectedHourly] === 3){
                                dIcon.src = "./assets/images/icon-overcast.webp";
                            }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-fog.webp";
                            }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-drizzle.webp";
                            }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-rain.webp";
                            }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-snow.webp";
                            }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-storm.webp";
                            }
                            selectedHourly += 1;
                        });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[3].dataset.day){
                        selectedDayHours = 72;
                        selectedHourly = 72;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                            if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-sunny.webp";
                            }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                            }else if(data.hourly.weather_code[selectedHourly] === 3){
                                dIcon.src = "./assets/images/icon-overcast.webp";
                            }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-fog.webp";
                            }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-drizzle.webp";
                            }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-rain.webp";
                            }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-snow.webp";
                            }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-storm.webp";
                            }
                            selectedHourly += 1;
                        });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[4].dataset.day){
                        selectedDayHours = 96;
                        selectedHourly = 96;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                            if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-sunny.webp";
                            }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                            }else if(data.hourly.weather_code[selectedHourly] === 3){
                                dIcon.src = "./assets/images/icon-overcast.webp";
                            }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-fog.webp";
                            }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-drizzle.webp";
                            }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-rain.webp";
                            }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-snow.webp";
                            }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-storm.webp";
                            }
                            selectedHourly += 1;
                        });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[5].dataset.day){
                        selectedDayHours = 120;
                        selectedHourly = 120;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                            if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-sunny.webp";
                            }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                            }else if(data.hourly.weather_code[selectedHourly] === 3){
                                dIcon.src = "./assets/images/icon-overcast.webp";
                            }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-fog.webp";
                            }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-drizzle.webp";
                            }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-rain.webp";
                            }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-snow.webp";
                            }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-storm.webp";
                            }
                            selectedHourly += 1;
                        });
                    }
                    else if(dayDropdown.dataset.currentday === selectedDayDAll[6].dataset.day){
                        selectedDayHours = 144;
                        selectedHourly = 144;
                        hourlyTemperature.forEach(htemp => {
                            htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                            selectedDayHours += 1;
                        });
                        hourlyIcon.forEach(dIcon => {
                            if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-sunny.webp";
                            }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                            }else if(data.hourly.weather_code[selectedHourly] === 3){
                                dIcon.src = "./assets/images/icon-overcast.webp";
                            }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-fog.webp";
                            }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-drizzle.webp";
                            }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-rain.webp";
                            }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-snow.webp";
                            }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                dIcon.src = "./assets/images/icon-storm.webp";
                            }
                            selectedHourly += 1;
                        });
                    }
                })
                .catch(err =>{
                    console.log(err);
                    errorHandler(err);
                });

                }else if(switchDiff.dataset.unit === "imperial"){
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=weather_code&hourly=temperature_2m&temperature_unit=fahrenheit&hourly=wind_speed_10m&wind_speed_unit=mph&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&precipitation_unit=inch&daily=temperature_2m_max&daily=temperature_2m_min`)
                    .then(res => res.json())
                    .then(data => {
                        currentTemp.textContent = data.hourly.temperature_2m[index] + "°";
                        windSpeed.textContent = data.hourly.wind_speed_10m[index] + " mph";
                        feelsLike.textContent = data.hourly.apparent_temperature[index] + "°";
                        humidity.textContent = data.hourly.relative_humidity_2m[index] + "%";
                        precipitation.textContent = data.hourly.precipitation[index] + " in";

                        maxTemp.forEach(max =>{
                            max.textContent = data.daily.temperature_2m_max[maxV] + "°";
                            maxV += 1;
                            max.style.fontSize = ".73rem";
                        });

                        minTemp.forEach(min =>{
                            min.textContent = data.daily.temperature_2m_min[minV] + "°";
                            minV += 1;
                            min.style.fontSize = ".73rem"; 
                        });


                        if(selectedDayD.dataset.day === selectedDayDAll[0].dataset.day){
                            selectedDayHours = 0;
                            selectedHourly = 0;
                            hourlyTemperature.forEach(htemp => {
                                htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                selectedDayHours += 1;
                            });
                            hourlyIcon.forEach(dIcon => {
                                if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-sunny.webp";
                                }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                }else if(data.hourly.weather_code[selectedHourly] === 3){
                                    dIcon.src = "./assets/images/icon-overcast.webp";
                                }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-fog.webp";
                                }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-drizzle.webp";
                                }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-rain.webp";
                                }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-snow.webp";
                                }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-storm.webp";
                                }
                                selectedHourly += 1;
                            });
                        }
                        else if(selectedDayD.dataset.day === selectedDayDAll[1].dataset.day){
                            selectedDayHours = 24;
                            selectedHourly = 24;
                            hourlyTemperature.forEach(htemp => {
                                htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                selectedDayHours += 1;
                            });
                            hourlyIcon.forEach(dIcon => {
                                if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-sunny.webp";
                                }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                }else if(data.hourly.weather_code[selectedHourly] === 3){
                                    dIcon.src = "./assets/images/icon-overcast.webp";
                                }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-fog.webp";
                                }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-drizzle.webp";
                                }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-rain.webp";
                                }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-snow.webp";
                                }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-storm.webp";
                                }
                                selectedHourly += 1;
                            });
                        }
                        else if(selectedDayD.dataset.day === selectedDayDAll[2].dataset.day){
                            selectedDayHours = 48;
                            selectedHourly = 48;
                            hourlyTemperature.forEach(htemp => {
                                htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                selectedDayHours += 1;
                            });
                            hourlyIcon.forEach(dIcon => {
                                if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-sunny.webp";
                                }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                }else if(data.hourly.weather_code[selectedHourly] === 3){
                                    dIcon.src = "./assets/images/icon-overcast.webp";
                                }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-fog.webp";
                                }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-drizzle.webp";
                                }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-rain.webp";
                                }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-snow.webp";
                                }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-storm.webp";
                                }
                                selectedHourly += 1;
                            });
                        }
                        else if(selectedDayD.dataset.day === selectedDayDAll[3].dataset.day){
                            selectedDayHours = 72;
                            selectedHourly = 72;
                            hourlyTemperature.forEach(htemp => {
                                htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                selectedDayHours += 1;
                            });
                            hourlyIcon.forEach(dIcon => {
                                if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-sunny.webp";
                                }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                }else if(data.hourly.weather_code[selectedHourly] === 3){
                                    dIcon.src = "./assets/images/icon-overcast.webp";
                                }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-fog.webp";
                                }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-drizzle.webp";
                                }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-rain.webp";
                                }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-snow.webp";
                                }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-storm.webp";
                                }
                                selectedHourly += 1;
                            });
                        }
                        else if(selectedDayD.dataset.day === selectedDayDAll[4].dataset.day){
                            selectedDayHours = 96;
                            selectedHourly = 96;
                            hourlyTemperature.forEach(htemp => {
                                htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                selectedDayHours += 1;
                            });
                            hourlyIcon.forEach(dIcon => {
                                if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-sunny.webp";
                                }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                }else if(data.hourly.weather_code[selectedHourly] === 3){
                                    dIcon.src = "./assets/images/icon-overcast.webp";
                                }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-fog.webp";
                                }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-drizzle.webp";
                                }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-rain.webp";
                                }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-snow.webp";
                                }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-storm.webp";
                                }
                                selectedHourly += 1;
                            });
                        }
                        else if(selectedDayD.dataset.day === selectedDayDAll[5].dataset.day){
                            selectedDayHours = 120;
                            selectedHourly = 120;
                            hourlyTemperature.forEach(htemp => {
                                htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                selectedDayHours += 1;
                            });
                            hourlyIcon.forEach(dIcon => {
                                if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-sunny.webp";
                                }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                }else if(data.hourly.weather_code[selectedHourly] === 3){
                                    dIcon.src = "./assets/images/icon-overcast.webp";
                                }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-fog.webp";
                                }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-drizzle.webp";
                                }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-rain.webp";
                                }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-snow.webp";
                                }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-storm.webp";
                                }
                                selectedHourly += 1;
                            });
                        }
                        else if(selectedDayD.dataset.day === selectedDayDAll[6].dataset.day){
                            selectedDayHours = 144;
                            selectedHourly = 144;
                            hourlyTemperature.forEach(htemp => {
                                htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                selectedDayHours += 1;
                            });
                            hourlyIcon.forEach(dIcon => {
                                if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-sunny.webp";
                                }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                }else if(data.hourly.weather_code[selectedHourly] === 3){
                                    dIcon.src = "./assets/images/icon-overcast.webp";
                                }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-fog.webp";
                                }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-drizzle.webp";
                                }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-rain.webp";
                                }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-snow.webp";
                                }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-storm.webp";
                                }
                                selectedHourly += 1;
                            });
                        }
                    })
                    .catch(err =>{
                        console.log(err);
                        errorHandler(err);
                    }); 
                }
                const tempCat = document.querySelector('.sub-cat[aria-checked="true"]');
                const subWind = document.querySelector('.sub-wind[aria-checked="true"]');
                const subPrec = document.querySelector('.sub-prec[aria-checked="true"]');

                console.log(tempCat.dataset.value);
                if(tempCat.dataset.value === "f"){
                        const now = new Date();
                        const currentHour = now.toISOString().slice(0, 13);
                        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=weather_code&hourly=temperature_2m&temperature_unit=fahrenheit&hourly=wind_speed_10m&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&&daily=temperature_2m_max&daily=temperature_2m_min`)
                        .then(res => res.json())
                        .then(data => {

                            const index = data.hourly.time.findIndex(t => t.startsWith(currentHour));
                            let maxV = 0;
                            let minV = 0;

                            currentTemp.textContent = data.hourly.temperature_2m[index] + "°";
                            feelsLike.textContent = data.hourly.apparent_temperature[index] + "°";
                            maxTemp.forEach(max =>{
                                max.textContent = data.daily.temperature_2m_max[maxV] + "°";
                                maxV += 1;
                                max.style.fontSize = ".73rem";
                            });

                            minTemp.forEach(min =>{
                                min.textContent = data.daily.temperature_2m_min[minV] + "°";
                                minV += 1;
                                min.style.fontSize = ".73rem";
                            });

                            if(dayDropdown.dataset.currentday === selectedDayDAll[0].dataset.day){
                                selectedDayHours = 0;
                                selectedHourly = 0;
                                hourlyTemperature.forEach(htemp => {
                                    htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                    selectedDayHours += 1;
                                });
                                hourlyIcon.forEach(dIcon => {
                                if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-sunny.webp";
                                }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                }else if(data.hourly.weather_code[selectedHourly] === 3){
                                    dIcon.src = "./assets/images/icon-overcast.webp";
                                }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-fog.webp";
                                }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-drizzle.webp";
                                }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-rain.webp";
                                }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-snow.webp";
                                }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-storm.webp";
                                }
                                selectedHourly += 1;
                            });
                            }
                            else if(dayDropdown.dataset.currentday === selectedDayDAll[1].dataset.day){
                                selectedDayHours = 24;
                                selectedHourly = 24;
                                hourlyTemperature.forEach(htemp => {
                                    htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                    selectedDayHours += 1;
                                });
                                hourlyIcon.forEach(dIcon => {
                                if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-sunny.webp";
                                }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                }else if(data.hourly.weather_code[selectedHourly] === 3){
                                    dIcon.src = "./assets/images/icon-overcast.webp";
                                }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-fog.webp";
                                }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-drizzle.webp";
                                }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-rain.webp";
                                }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-snow.webp";
                                }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-storm.webp";
                                }
                                selectedHourly += 1;
                            });
                            }
                            else if(dayDropdown.dataset.currentday === selectedDayDAll[2].dataset.day){
                                selectedDayHours = 48;
                                selectedHourly = 48;
                                hourlyTemperature.forEach(htemp => {
                                    htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                    selectedDayHours += 1;
                                });
                                hourlyIcon.forEach(dIcon => {
                                if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-sunny.webp";
                                }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                }else if(data.hourly.weather_code[selectedHourly] === 3){
                                    dIcon.src = "./assets/images/icon-overcast.webp";
                                }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-fog.webp";
                                }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-drizzle.webp";
                                }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-rain.webp";
                                }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-snow.webp";
                                }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-storm.webp";
                                }
                                selectedHourly += 1;
                            });
                            }
                            else if(dayDropdown.dataset.currentday === selectedDayDAll[3].dataset.day){
                                selectedDayHours = 72;
                                selectedHourly = 72;
                                hourlyTemperature.forEach(htemp => {
                                    htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                    selectedDayHours += 1;
                                });
                                hourlyIcon.forEach(dIcon => {
                                if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-sunny.webp";
                                }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                }else if(data.hourly.weather_code[selectedHourly] === 3){
                                    dIcon.src = "./assets/images/icon-overcast.webp";
                                }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-fog.webp";
                                }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-drizzle.webp";
                                }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-rain.webp";
                                }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-snow.webp";
                                }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-storm.webp";
                                }
                                selectedHourly += 1;
                            });
                            }
                            else if(dayDropdown.dataset.currentday === selectedDayDAll[4].dataset.day){
                                selectedDayHours = 96;
                                selectedHourly = 96;
                                hourlyTemperature.forEach(htemp => {
                                    htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                    selectedDayHours += 1;
                                });
                                hourlyIcon.forEach(dIcon => {
                                if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-sunny.webp";
                                }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                }else if(data.hourly.weather_code[selectedHourly] === 3){
                                    dIcon.src = "./assets/images/icon-overcast.webp";
                                }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-fog.webp";
                                }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-drizzle.webp";
                                }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-rain.webp";
                                }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-snow.webp";
                                }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-storm.webp";
                                }
                                selectedHourly += 1;
                            });
                            }
                            else if(dayDropdown.dataset.currentday === selectedDayDAll[5].dataset.day){
                                selectedDayHours = 120;
                                selectedHourly = 120;
                                hourlyTemperature.forEach(htemp => {
                                    htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                    selectedDayHours += 1;
                                });
                                hourlyIcon.forEach(dIcon => {
                                if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-sunny.webp";
                                }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                }else if(data.hourly.weather_code[selectedHourly] === 3){
                                    dIcon.src = "./assets/images/icon-overcast.webp";
                                }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-fog.webp";
                                }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-drizzle.webp";
                                }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-rain.webp";
                                }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-snow.webp";
                                }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-storm.webp";
                                }
                                selectedHourly += 1;
                            });
                            }
                            else if(dayDropdown.dataset.currentday === selectedDayDAll[6].dataset.day){
                                selectedDayHours = 144;
                                selectedHourly = 144;
                                hourlyTemperature.forEach(htemp => {
                                    htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                    selectedDayHours += 1;
                                });
                                hourlyIcon.forEach(dIcon => {
                                if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-sunny.webp";
                                }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                }else if(data.hourly.weather_code[selectedHourly] === 3){
                                    dIcon.src = "./assets/images/icon-overcast.webp";
                                }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-fog.webp";
                                }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-drizzle.webp";
                                }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-rain.webp";
                                }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-snow.webp";
                                }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                    dIcon.src = "./assets/images/icon-storm.webp";
                                }
                                selectedHourly += 1;
                            });
                            }
                        })
                        .catch(err =>{
                            console.log(err);
                            errorHandler(err);
                        });
                        }if (tempCat.dataset.value === "c"){
                            const now = new Date();
                            const currentHour = now.toISOString().slice(0, 13);
                            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=weather_code&hourly=temperature_2m&temperature_unit=celsius&hourly=wind_speed_10m&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&&daily=temperature_2m_max&daily=temperature_2m_min`)
                            .then(res => res.json())
                            .then(data => {

                                const index = data.hourly.time.findIndex(t => t.startsWith(currentHour));
                                let maxV = 0;
                                let minV = 0;

                                currentTemp.textContent = data.hourly.temperature_2m[index] + "°";
                                feelsLike.textContent = data.hourly.apparent_temperature[index] + "°";
                                maxTemp.forEach(max =>{
                                    max.textContent = data.daily.temperature_2m_max[maxV] + "°";
                                    maxV += 1;
                                    max.style.fontSize = ".73rem";
                                });

                                minTemp.forEach(min =>{
                                    min.textContent = data.daily.temperature_2m_min[minV] + "°";
                                    minV += 1;
                                    min.style.fontSize = ".73rem";
                                });

                                if(dayDropdown.dataset.currentday === selectedDayDAll[0].dataset.day){
                                    selectedDayHours = 0;
                                    selectedHourly = 0;
                                    hourlyTemperature.forEach(htemp => {
                                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                        selectedDayHours += 1;
                                    });
                                    hourlyIcon.forEach(dIcon => {
                                    if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-sunny.webp";
                                    }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                    }else if(data.hourly.weather_code[selectedHourly] === 3){
                                        dIcon.src = "./assets/images/icon-overcast.webp";
                                    }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-fog.webp";
                                    }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-drizzle.webp";
                                    }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-rain.webp";
                                    }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-snow.webp";
                                    }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-storm.webp";
                                    }
                                    selectedHourly += 1;
                                });
                                }
                                if(dayDropdown.dataset.currentday === selectedDayDAll[1].dataset.day){
                                    selectedDayHours = 24;
                                    selectedHourly = 24;
                                    hourlyTemperature.forEach(htemp => {
                                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                        selectedDayHours += 1;
                                    });
                                    hourlyIcon.forEach(dIcon => {
                                    if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-sunny.webp";
                                    }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                    }else if(data.hourly.weather_code[selectedHourly] === 3){
                                        dIcon.src = "./assets/images/icon-overcast.webp";
                                    }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-fog.webp";
                                    }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-drizzle.webp";
                                    }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-rain.webp";
                                    }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-snow.webp";
                                    }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-storm.webp";
                                    }
                                    selectedHourly += 1;
                                });
                                }
                                if(dayDropdown.dataset.currentday === selectedDayDAll[2].dataset.day){
                                    selectedDayHours = 48;
                                    selectedHourly = 48;
                                    hourlyTemperature.forEach(htemp => {
                                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                        selectedDayHours += 1;
                                    });
                                    hourlyIcon.forEach(dIcon => {
                                    if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-sunny.webp";
                                    }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                    }else if(data.hourly.weather_code[selectedHourly] === 3){
                                        dIcon.src = "./assets/images/icon-overcast.webp";
                                    }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-fog.webp";
                                    }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-drizzle.webp";
                                    }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-rain.webp";
                                    }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-snow.webp";
                                    }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-storm.webp";
                                    }
                                    selectedHourly += 1;
                                });
                                }
                                else if(dayDropdown.dataset.currentday === selectedDayDAll[3].dataset.day){
                                    selectedDayHours = 72;
                                    selectedHourly = 72;
                                    hourlyTemperature.forEach(htemp => {
                                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                        selectedDayHours += 1;
                                    });
                                    hourlyIcon.forEach(dIcon => {
                                    if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-sunny.webp";
                                    }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                    }else if(data.hourly.weather_code[selectedHourly] === 3){
                                        dIcon.src = "./assets/images/icon-overcast.webp";
                                    }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-fog.webp";
                                    }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-drizzle.webp";
                                    }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-rain.webp";
                                    }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-snow.webp";
                                    }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-storm.webp";
                                    }
                                    selectedHourly += 1;
                                });
                                }
                                else if(dayDropdown.dataset.currentday === selectedDayDAll[4].dataset.day){
                                    selectedDayHours = 96;
                                    selectedHourly = 96;
                                    hourlyTemperature.forEach(htemp => {
                                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                        selectedDayHours += 1;
                                    });
                                    hourlyIcon.forEach(dIcon => {
                                    if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-sunny.webp";
                                    }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                    }else if(data.hourly.weather_code[selectedHourly] === 3){
                                        dIcon.src = "./assets/images/icon-overcast.webp";
                                    }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-fog.webp";
                                    }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-drizzle.webp";
                                    }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-rain.webp";
                                    }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-snow.webp";
                                    }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-storm.webp";
                                    }
                                    selectedHourly += 1;
                                });
                                }
                                else if(dayDropdown.dataset.currentday === selectedDayDAll[5].dataset.day){
                                    selectedDayHours = 120;
                                    selectedHourly = 120;
                                    hourlyTemperature.forEach(htemp => {
                                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                        selectedDayHours += 1;
                                    });
                                    hourlyIcon.forEach(dIcon => {
                                    if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-sunny.webp";
                                    }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                    }else if(data.hourly.weather_code[selectedHourly] === 3){
                                        dIcon.src = "./assets/images/icon-overcast.webp";
                                    }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-fog.webp";
                                    }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-drizzle.webp";
                                    }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-rain.webp";
                                    }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-snow.webp";
                                    }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-storm.webp";
                                    }
                                    selectedHourly += 1;
                                });
                                }
                                else if(dayDropdown.dataset.currentday === selectedDayDAll[6].dataset.day){
                                    selectedDayHours = 144;
                                    selectedHourly = 144;
                                    hourlyTemperature.forEach(htemp => {
                                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                                        selectedDayHours += 1;
                                    });
                                    hourlyIcon.forEach(dIcon => {
                                    if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-sunny.webp";
                                    }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                                    }else if(data.hourly.weather_code[selectedHourly] === 3){
                                        dIcon.src = "./assets/images/icon-overcast.webp";
                                    }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-fog.webp";
                                    }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-drizzle.webp";
                                    }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-rain.webp";
                                    }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-snow.webp";
                                    }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                                        dIcon.src = "./assets/images/icon-storm.webp";
                                    }
                                    selectedHourly += 1;
                                });
                                }
                            })
                            .catch(err =>{
                                console.log(err);
                                errorHandler(err);
                            });
                        } 
                        
                        
                        if(subWind.dataset.value === "kmh"){
                            const now = new Date();
                            const currentHour = now.toISOString().slice(0, 13);
                            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&hourly=wind_speed_10m&wind_speed_unit=kmh&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&&daily=temperature_2m_max&daily=temperature_2m_min`)
                            .then(res => res.json())
                            .then(data => {

                                const index = data.hourly.time.findIndex(t => t.startsWith(currentHour));
                                windSpeed.textContent = data.hourly.wind_speed_10m[index] + " km/h";
                            })
                            .catch(err =>{
                                console.log(err);
                                errorHandler(err);
                            });
                        }
                        if(subWind.dataset.value === "mph"){
                            const now = new Date();
                            const currentHour = now.toISOString().slice(0, 13);
                            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&hourly=wind_speed_10m&wind_speed_unit=mph&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&&daily=temperature_2m_max&daily=temperature_2m_min`)
                            .then(res => res.json())
                            .then(data => {

                                const index = data.hourly.time.findIndex(t => t.startsWith(currentHour));
                                windSpeed.textContent = data.hourly.wind_speed_10m[index] + " mph";
                            })
                            .catch(err =>{
                                console.log(err);
                                errorHandler(err);
                            });
                        }

                        
                        if(subPrec.dataset.value === "mm"){
                            const now = new Date();
                            const currentHour = now.toISOString().slice(0, 13);
                            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&hourly=wind_speed_10m&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&precipitation_unit=mm&daily=temperature_2m_max&daily=temperature_2m_min`)
                            .then(res => res.json())
                            .then(data => {
                                const index = data.hourly.time.findIndex(t => t.startsWith(currentHour));
                                precipitation.textContent = data.hourly.precipitation[index] + " mm";
                            });
                        }
                        if(subPrec.dataset.value === "in"){
                            const now = new Date();
                            const currentHour = now.toISOString().slice(0, 13);
                            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&hourly=wind_speed_10m&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&precipitation_unit=inch&daily=temperature_2m_max&daily=temperature_2m_min`)
                            .then(res => res.json())
                            .then(data => {

                                const index = data.hourly.time.findIndex(t => t.startsWith(currentHour));
                                precipitation.textContent = data.hourly.precipitation[index] + " in";
                            });
                        }  
                            console.log(data.hourly.temperature_2m[index]);
            })
            .catch(err =>{
                console.log(err);
                errorHandler(err);
            });
                    
    };

    if(switchUnits){
        switchUnits.classList.toggle('selected');

        if(switchUnits.classList.contains('selected')){
            switchUnits.setAttribute('aria-checked','true');
            switchUnits.textContent = "Switch to Metric";
            switchUnits.dataset.unit = "imperial";
            subCategory.forEach(cat => {
                cat.classList.remove('selected');
                cat.setAttribute('aria-checked','false');
            }); 

            subImperial.forEach(imp => {
                imp.classList.add('selected')
                imp.setAttribute('aria-checked','true');
            });

            nameC.textContent = `${locName}` + ",";
            countryN.textContent = `${countryName}`;

            const now = new Date();
            const currentHour = now.toISOString().slice(0, 13);
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=weather_code&hourly=temperature_2m&temperature_unit=fahrenheit&hourly=wind_speed_10m&wind_speed_unit=mph&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&precipitation_unit=inch&daily=temperature_2m_max&daily=temperature_2m_min`)
            .then(res => res.json())       
            .then(data => {

                const index = data.hourly.time.findIndex(t => t.startsWith(currentHour));
                let maxV = 0;
                let minV = 0;
                let days = 0;

                const currrentDay = new Date();
                const currTzWDay = currrentDay.toLocaleDateString("en-US", {weekday:"long", timeZone: data.timezone});
                const currTzMonth = currrentDay.toLocaleDateString("en-US", {month:"short", timeZone: data.timezone});
                const currTzDay = currrentDay.toLocaleDateString("en-US", {day:"numeric", timeZone: data.timezone});
                const currTzYear = currrentDay.toLocaleDateString("en-US", {year:"numeric", timeZone: data.timezone});
                tzDate.textContent = `${currTzWDay}, ${currTzMonth} ${currTzDay}, ${currTzYear}`
                console.log(data);

                currentTemp.textContent = data.hourly.temperature_2m[index] + "°";
                windSpeed.textContent = data.hourly.wind_speed_10m[index] + " mph";
                feelsLike.textContent = data.hourly.apparent_temperature[index] + "°";
                humidity.textContent = data.hourly.relative_humidity_2m[index] + "%";
                precipitation.textContent = data.hourly.precipitation[index] + " in";

                
                dailyDays.forEach(dayd =>{
                    const date = new Date(data.daily.time[days]);
                    const curDay = date.toLocaleDateString("en-US", {weekday: "short", timeZone: data.timezone});

                    dayd.textContent = `${curDay}`;

                    console.log(curDay, data.name)

                    days += 1;
                });

                maxTemp.forEach(max =>{
                    max.textContent = data.daily.temperature_2m_max[maxV] + "°";
                    maxV += 1;
                    max.style.fontSize = ".73rem";
                });

                minTemp.forEach(min =>{
                    min.textContent = data.daily.temperature_2m_min[minV] + "°";
                    minV += 1;
                    min.style.fontSize = ".73rem";
                });

                console.log(data.hourly.temperature_2m[index]);

                if(dayDropdown.dataset.currentday === selectedDayDAll[0].dataset.day){
                    selectedDayHours = 0;
                    selectedHourly = 0;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {

                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[1].dataset.day){
                    selectedDayHours = 24;
                    selectedHourly = 24;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[1].dataset.day){
                    selectedDayHours = 48;
                    selectedHourly = 48;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[1].dataset.day){
                    selectedDayHours = 72;
                    selectedHourly = 72;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[1].dataset.day){
                    selectedDayHours = 96;
                    selectedHourly = 96;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[1].dataset.day){
                    selectedDayHours = 120;
                    selectedHourly = 120;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[1].dataset.day){
                    selectedDayHours = 144;
                    selectedHourly = 144;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
            })
            
            
        }else{
            switchUnits.setAttribute('aria-checked','false');
            switchUnits.textContent = "Switch to Imperial";
            switchUnits.dataset.unit = "metric"
            subCategory.forEach(cat => {
                cat.classList.remove('selected');
                cat.setAttribute('aria-checked','false');
            }); 

            subMetric.forEach(met => {
                met.classList.add('selected')
                met.setAttribute('aria-checked','true');
            });

            nameC.textContent = `${locName}` + ",";
            countryN.textContent = `${countryName}`;

            const now = new Date();
            const currentHour = now.toISOString().slice(0, 13);
            console.log(now);
        

            console.log(lat, lon)
        
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=weather_code&hourly=temperature_2m&temperature_unit=celsius&hourly=wind_speed_10m&wind_speed_unit=kmh&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&precipitation_unit=mm&daily=temperature_2m_max&daily=temperature_2m_min`)
            .then(res => res.json())
            .then(data => {

                const index = data.hourly.time.findIndex(t => t.startsWith(currentHour));
                let maxV = 0;
                let minV = 0;
                let days = 0;

                const currrentDay = new Date();
                const currTzWDay = currrentDay.toLocaleDateString("en-US", {weekday:"long", timeZone: data.timezone});
                const currTzMonth = currrentDay.toLocaleDateString("en-US", {month:"short", timeZone: data.timezone});
                const currTzDay = currrentDay.toLocaleDateString("en-US", {day:"numeric", timeZone: data.timezone});
                const currTzYear = currrentDay.toLocaleDateString("en-US", {year:"numeric", timeZone: data.timezone});
                tzDate.textContent = `${currTzWDay}, ${currTzMonth} ${currTzDay}, ${currTzYear}`
                console.log(data);

                currentTemp.textContent = data.hourly.temperature_2m[index] + "°";
                windSpeed.textContent = data.hourly.wind_speed_10m[index] + " km/h";
                feelsLike.textContent = data.hourly.apparent_temperature[index] + "°";
                humidity.textContent = data.hourly.relative_humidity_2m[index] + "%";
                precipitation.textContent = data.hourly.precipitation[index] + " mm";

                if(data.hourly.weather_code[index] === 0){
                    console.log("working");
                    currentTempImg.src = "./assets/images/icon-sunny.webp";
                }


                dailyDays.forEach(dayd =>{
                    const date = new Date(data.daily.time[days]);
                    const curDay = date.toLocaleDateString("en-US", {weekday: "short", timeZone: data.timezone});

                    dayd.textContent = `${curDay}`;

                    console.log(curDay, data.name)

                    days += 1;
                });

                maxTemp.forEach(max =>{
                    max.textContent = data.daily.temperature_2m_max[maxV] + "°";
                    maxV += 1;
                    max.style.fontSize = ".73rem";
                });

                minTemp.forEach(min =>{
                    min.textContent = data.daily.temperature_2m_min[minV] + "°";
                    minV += 1;
                    min.style.fontSize = ".73rem";
                });

                console.log(data.hourly.temperature_2m[index]);

                if(dayDropdown.dataset.currentday === selectedDayDAll[0].dataset.day){
                    selectedDayHours = 0;
                    selectedHourly = 0;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[1].dataset.day){
                    selectedDayHours = 24;
                    selectedHourly = 24;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[2].dataset.day){
                    selectedDayHours = 48;
                    selectedHourly = 48;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[3].dataset.day){
                    selectedDayHours = 72;
                    selectedHourly = 72;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[4].dataset.day){
                    selectedDayHours = 96;
                    selectedHourly = 96;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[5].dataset.day){
                    selectedDayHours = 120;
                    selectedHourly = 120;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[6].dataset.day){
                    selectedDayHours = 144;
                    selectedHourly = 144;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
            });

        }
        
    }


    if(selectedDay){
        const dayContainer = selectedDay.closest('.day-dropdown');
        dayDropdown.dataset.currentday = selectedDay.dataset.day;
        dayContainer.querySelectorAll('.day').forEach(btn => {
            btn.classList.remove('selected');
            btn.setAttribute('aria-checked','false');
            document.querySelector('.day-dropdown').classList.remove('showF');
        });

        selectedDay.classList.add('selected');
        selectedDay.setAttribute('aria-checked','true');
        let selectedHourly          ;
        
        document.querySelector('.day-dropdown-btn').innerHTML = `${selectedDay.dataset.day} <img src="./assets/images/icon-dropdown.svg" alt="">`;
        if(switchDiff.dataset.unit === "metric"){
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=weather_code&hourly=temperature_2m&temperature_unit=celsius&hourly=wind_speed_10m&wind_speed_unit=kmh&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&precipitation_unit=mm&daily=temperature_2m_max&daily=temperature_2m_min`)
            .then(res => res.json())
            .then(data => {
                if(dayDropdown.dataset.currentday === selectedDayDAll[0].dataset.day){
                    
                    selectedDayHours = 0;
                    selectedHourly = 0;
                    console.log(selectedHourly);
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[1].dataset.day){ 
                    selectedDayHours = 24;
                    selectedHourly = 24;
                    console.log(selectedHourly);
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[2].dataset.day){
                    selectedDayHours = 48;
                    selectedHourly = 48;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[3].dataset.day){
                    selectedDayHours = 72;
                    selectedHourly = 72;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[4].dataset.day){
                    selectedDayHours = 96;
                    selectedHourly = 96;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[5].dataset.day){
                    selectedDayHours = 120;
                    selectedHourly = 120;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
                else if(dayDropdown.dataset.currentday === selectedDayDAll[6].dataset.day){
                    selectedDayHours = 144;
                    selectedHourly = 144;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                    hourlyIcon.forEach(dIcon => {
                        if([0,1].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-sunny.webp";
                        }else if([2].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-partly-cloudy.webp";
                        }else if(data.hourly.weather_code[selectedHourly] === 3){
                            dIcon.src = "./assets/images/icon-overcast.webp";
                        }else if([45,48].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-fog.webp";
                        }else if([51,53,55,56,57].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-drizzle.webp";
                        }else if([61,63,65,66,67,80,81,82].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-rain.webp";
                        }else if([71,73,75,77,85,86].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-snow.webp";
                        }else if([95,96,99].includes(data.hourly.weather_code[selectedHourly])){
                            dIcon.src = "./assets/images/icon-storm.webp";
                        }
                        selectedHourly += 1;
                    });
                }
            })
            .catch(err =>{
                console.log(err);
                errorHandler(err);
            });
        }else if(switchDiff.dataset.unit === "imperial"){
           fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&temperature_unit=fahrenheit&hourly=wind_speed_10m&wind_speed_unit=kmh&hourly=apparent_temperature&hourly=relative_humidity_2m&hourly=precipitation&precipitation_unit=mm&daily=temperature_2m_max&daily=temperature_2m_min`)
            .then(res => res.json())
            .then(data => {
                if(selectedDayD.dataset.day === "Monday"){
                    selectedDayHours = 0;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                }
                else if(selectedDayD.dataset.day === "Tuesday"){
                    selectedDayHours = 24;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                }
                else if(selectedDayD.dataset.day === "Wednesday"){
                    selectedDayHours = 48;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                }
                else if(selectedDayD.dataset.day === "Thursday"){
                    selectedDayHours = 72;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                }
                else if(selectedDayD.dataset.day === "Friday"){
                    selectedDayHours = 96;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                }
                else if(selectedDayD.dataset.day === "Saturday"){
                    selectedDayHours = 120;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                }
                else if(selectedDayD.dataset.day === "Sunday"){
                    selectedDayHours = 144;
                    hourlyTemperature.forEach(htemp => {
                        htemp.textContent = data.hourly.temperature_2m[selectedDayHours] + "°";
                        selectedDayHours += 1;
                    });
                }
            })
            .catch(err =>{
                console.log(err);
                errorHandler(err);
            });
        }
    };

    if(searchButton){
        results.classList.add('showF');
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search.value}`)
        .then(res => res.json())
        .then(data => {
            results.innerHTML = "";
            if(!data.results){
                wrapper.classList.add('hide');
                results.classList.remove('showF');
                noResult.classList.remove('hide');
            }else{
            noResult.classList.add('hide');
            const filteredResults = data.results || [];

            filteredResults.forEach(loc => {
                const li = document.createElement('li');
                li.className = "search-results";
                li.textContent = loc.name;
                li.dataset.name = loc.name;
                li.dataset.country = loc.country;
                li.dataset.lat = loc.latitude;
                li.dataset.lon = loc.longitude;
                results.appendChild(li);
                
            });
            console.log(filteredResults)
            }
        })
        .catch(err =>{
            console.log(err);
            errorHandler(err);
        });          
    }

});

function errorHandler(err){
    if(err.message.includes('400')) {
        wrapper.classList.add('hide');
        hero.classList.add('hide');
        error.classList.add('showF');
        document.querySelector('.units-dropdown').classList.remove('showF');
    }else{
        wrapper.classList.add('hide');
        hero.classList.add('hide');
        error.classList.add('showF');
        document.querySelector('.units-dropdown').classList.remove('showF');
    }
}