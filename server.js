import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve the main page
app.get("/", (req, res) => {
    res.render("index");
});

// Weather API route
app.get("/weather", async (req, res) => {
    const cityName = req.query.city;  // Get the city from query params
    const apiKey = "21730a3f4947f157768bc38f0c011a79";  // Use your OpenWeather API key

    try {
        // Fetch geolocation based on the city name
        const geoResponse = await axios.get(` http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=21730a3f4947f157768bc38f0c011a79`);
        if (!geoResponse.data.length) {
            return res.status(404).json({ error: "City not found" });
        }

        const { lat, lon } = geoResponse.data[0];

        // Fetch weather data using latitude and longitude
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=21730a3f4947f157768bc38f0c011a79&units=metric`);
        const weatherData = weatherResponse.data;

        // Send weather data as JSON
        res.json({
            city: weatherData.name,
            country: weatherData.sys.country,
            temp: weatherData.main.temp,
            icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
            feels_like: weatherData.main.feels_like,
            temp_min: weatherData.main.temp_min,
            temp_max: weatherData.main.temp_max,
            humidity: weatherData.main.humidity,
            pressure: weatherData.main.pressure,
            wind: weatherData.wind.speed,
            main: weatherData.weather[0].main
        });

    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: "Error retrieving weather data" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
