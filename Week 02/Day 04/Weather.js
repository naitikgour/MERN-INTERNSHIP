setTimeout(() => {
    async function getweather() {
        const data = await fetch("https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.23&current_weather=true");
        const weatherData = await data.json();
        console.log("current temp:", weatherData.current_weather.temperature,weatherData.current_weather_units.temperature);
        console.log("current windspeed:", weatherData.current_weather.windspeed,weatherData.current_weather_units.windspeed);
    }
    getweather(), 2000});
console.log("fetching data----")