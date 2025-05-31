const fetch = require('node-fetch');

async function getWeather(lat, lon) {
  try {
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`;
    const weatherRes = await fetch(weatherURL);
    if (!weatherRes.ok) {
      throw new Error(`Failed to fetch weather data. Status: ${weatherRes.status}`);
    }
    const data = await weatherRes.json();
    return data.current;
  } catch (error) {
    console.error(`Error fetching weather data: ${error.message}`);
    throw error; // Re-throw the error after logging it
  }
}

module.exports = { getWeather };

