const { getWeatherInfo } = require('./services/weather_service');

async function testCache() {
  const location = {
    city: "Toronto",
    state: "Ontario",
    countryInput: "Canada"
  };

  console.log("Fetching weather info for the first time...");
  let info = await getWeatherInfo(location);
  console.log(`Weather in ${info.name}: ${info.tempF}°F, ${info.description}`);

  console.log("\nFetching weather info again to test cache...");
  info = await getWeatherInfo(location);
  console.log(`Weather in ${info.name}: ${info.tempF}°F, ${info.description}`);
}

testCache().catch(error => console.error(`Error: ${error.message}`));