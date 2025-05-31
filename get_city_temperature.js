const { getWeatherInfo } = require("./services/weather_service");
const readline = require("readline-sync");
const { getWeatherMood } = require("./services/mood");

(async () => {
  try {
    const city = readline.question("Enter city name: ");
    const state = readline.question("Enter state (optional): ");
    const countryInput = readline.question("Enter country name: ");

    if (!city || !countryInput) {
      throw new Error("City and country are required fields.");
    }

    const { name, tempF, description } = await getWeatherInfo({ city, state, countryInput });

    console.log(`\n📍 Weather in ${name}, ${countryInput}`);
    console.log(`🌡️ Temperature: ${tempF}°F`);
    console.log(`🌥️ Condition: ${description}`);
    console.log(getWeatherMood(description));
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
})();