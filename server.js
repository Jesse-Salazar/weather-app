const express = require('express');
const cors = require('cors');
const { getWeatherInfo } = require('./services/weather_service');
const app = express();

app.use(cors());

app.get('/api/weather', async (req, res) => {
  const { city, state, country } = req.query;
  try {
    const weatherInfo = await getWeatherInfo({ city, state, countryInput: country });
    res.json(weatherInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});