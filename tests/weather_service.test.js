const { getWeatherInfo } = require('../services/weather_service');
const geo = require('../services/geocode');
const weather = require('../services/weather');

jest.mock('../services/geocode');
jest.mock('../services/weather');

test('integrates geocode and weather services', async () => {
  geo.getCoordinates.mockResolvedValue({
    name: "Toronto", latitude: 43.65, longitude: -79.38
  });
  weather.getWeather.mockResolvedValue({
    temperature_2m: 70, weather_code: 2
  });

  const result = await getWeatherInfo({ city: "Toronto", state: "Ontario", countryInput: "Canada" });
  expect(result.name).toBe("Toronto");
  expect(result.tempF).toBe(70);
  expect(result.description).toBe("Partly cloudy");
});

test('handles unknown weather codes gracefully', async () => {
  geo.getCoordinates.mockResolvedValue({
    name: "Nowhere", latitude: 0, longitude: 0
  });
  weather.getWeather.mockResolvedValue({
    temperature_2m: 55, weather_code: 999
  });

  const result = await getWeatherInfo({ city: "Nowhere", state: "", countryInput: "Canada" });
  expect(result.description).toBe("Unknown weather");
});