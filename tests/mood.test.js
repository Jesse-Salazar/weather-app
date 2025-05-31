const { getWeatherMood } = require('../services/mood');

test('returns correct mood for known descriptions', () => {
  expect(getWeatherMood('Clear sky')).toMatch(/outside/);
  expect(getWeatherMood('Partly cloudy')).toMatch(/balance/);
  expect(getWeatherMood('Heavy rain')).toMatch(/umbrella/);
});

test('returns fallback message for unknown description', () => {
  expect(getWeatherMood('Alien weather')).toMatch(/awesome/);
});

test('handles empty and null descriptions gracefully', () => {
  expect(getWeatherMood('')).toMatch(/awesome/);
  expect(getWeatherMood(null)).toMatch(/awesome/);
});