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

function getWeatherMood(description) {
  description = description.toLowerCase();
  for (let key in weatherMoods) {
    if (description.includes(key)) return weatherMoods[key];
  }
  return "Weather's doing its thing. Stay awesome! 🌈";
}

module.exports = { getWeatherMood };