const { getCoordinates } = require('./geocode');
const { getWeather } = require('./weather');
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');

const weatherDescriptions = {
  0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Fog", 48: "Depositing rime fog", 51: "Light drizzle", 53: "Moderate drizzle",
  55: "Dense drizzle", 61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
  71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow", 80: "Rain showers",
  95: "Thunderstorm"
};
/**
 * Retrieves weather information for a specified location.
 *
 * @param {Object} location - The location details.
 * @param {string} location.city - The name of the city.
 * @param {string} [location.state] - The state or region of the city (optional).
 * @param {string} location.countryInput - The name of the country.
 * @returns {Promise<Object>} A promise that resolves to an object containing weather information.
 * @returns {string} return.name - The name of the location.
 * @returns {number} return.tempF - The temperature in Fahrenheit.
 * @returns {string} return.description - A description of the weather conditions.
 * @throws {Error} Throws an error if the weather data cannot be retrieved.
 *
 * @example
 * const location = {
 *   city: "Toronto",
 *   state: "Ontario",
 *   countryInput: "Canada"
 * };
 *
 * getWeatherInfo(location)
 *   .then(info => {
 *     console.log(`Weather in ${info.name}: ${info.tempF}°F, ${info.description}`);
 *   })
 *   .catch(error => {
 *     console.error(`Error fetching weather info: ${error.message}`);
 *   });
 */
async function getWeatherInfo({ city, state, countryInput }) {
  const cacheKey = `${city}-${state}-${countryInput}`;
  const cachedData = localStorage.getItem(cacheKey);
  const oneHour = 60 * 60 * 1000;

  if (cachedData) {
    const { timestamp, data } = JSON.parse(cachedData);
    if (Date.now() - timestamp < oneHour) {
      return data;
    }
  }

  const location = await getCoordinates(city, state, countryInput);
  const { latitude, longitude, name } = location;
  const weather = await getWeather(latitude, longitude);
  const description = weatherDescriptions[weather.weather_code] || "Unknown weather";

  const weatherInfo = {
    name,
    tempF: weather.temperature_2m,
    description
  };

  localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: weatherInfo }));

  return weatherInfo;
}

module.exports = { getWeatherInfo };