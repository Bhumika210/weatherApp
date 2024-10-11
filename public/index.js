document.getElementById('weatherForm').addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent the form from reloading the page

    const city = document.getElementById('city').value;  // Get the value entered by the user

    try {
        const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
        const weatherData = await response.json();  // Parse the JSON response

        // Update the DOM with weather data
        document.querySelector('.cityName').textContent = `${weatherData.city}, ${weatherData.country}`;
        document.querySelector('.icon').src = weatherData.icon;
        document.querySelector('.temp').textContent = `${weatherData.temp}°C`;
        document.querySelector('.info_1').textContent = weatherData.main;
        document.querySelector('.info_container').innerHTML = `
            <span class="info">Feels like: ${weatherData.feels_like}°C</span>
            <span class="info">Min Temp: ${weatherData.temp_min}°C</span>
            <span class="info">Max Temp: ${weatherData.temp_max}°C</span>
            <span class="info">Humidity: ${weatherData.humidity}%</span>
            <span class="info">Wind: ${weatherData.wind}km/h</span>
            <span class="info">Pressure: ${weatherData.pressure}hPa</span>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
});
