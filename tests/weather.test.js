const { getWeather } = require('../services/weather');
const fetch = require('node-fetch');
jest.mock('node-fetch');

test('returns weather data', async () => {
  const mockWeather = {
    current: { temperature_2m: 72, weather_code: 0 }
  };
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockWeather
  });

  const data = await getWeather(43.65, -79.38);
  expect(data.temperature_2m).toBe(72);
});

test('throws error on failed weather API response', async () => {
  fetch.mockResolvedValueOnce({ ok: false });
  await expect(getWeather(43.65, -79.38)).rejects.toThrow(/Failed to fetch weather data/);
});