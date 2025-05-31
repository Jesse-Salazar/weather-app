const weatherMoods = {
  clear: "It's a perfect day to be outside! 🌞",
  "partly cloudy": "A little sun, a little cloud – a nice balance. 🌤️",
  cloudy: "Cloudy skies call for coffee and coziness ☁️",
  overcast: "It might be a good day for indoor adventures! ☁️",
  rain: "Don't forget your umbrella! ☔",
  snow: "Bundle up and maybe build a snowman! ❄️",
  thunderstorm: "Stay safe and enjoy nature's light show! ⚡",
  fog: "A mysterious and moody day ahead. 🌫️",
  "mainly clear": "Just a sunny day ahead. 🌞",
  "rain showers": "Don't forget your umbrella! 🌧️",
  "light drizzle": "Just a sunny day ahead. 🌧️",
};

async function getWeather(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  const city = document.getElementById('cityField').value;
  const state = document.getElementById('stateField').value;
  const countryInput = document.getElementById('countryField').value;

  if (!city || !countryInput) {
    alert("City and country are required fields.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/weather?city=${city}&state=${state}&country=${countryInput}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const { name, tempF, description } = await response.json();

    document.getElementById('weatherResult').innerHTML = `
      <p>📍 Weather in ${name}, ${countryInput}</p>
      <p>🌡️ Temperature: ${tempF}°F</p>
      <p>🌥️ Condition: ${description}</p>
      <p>👉 ${getWeatherMood(description)}</p>
    `;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    alert(`Error: ${error.message}`);
  }
}

function getWeatherMood(description) {
  description = description.toLowerCase();
  for (let key in weatherMoods) {
    if (description.includes(key)) return weatherMoods[key];
  }
  return "Weather's doing its thing. Stay awesome! 🌈";
}