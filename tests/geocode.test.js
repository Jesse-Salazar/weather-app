const { getCoordinates } = require('../services/geocode');
const fetch = require('node-fetch');
jest.mock('node-fetch');

const mockGeoResponse = {
  results: [{
    name: "Toronto",
    country: "CA",
    admin1: "Ontario",
    latitude: 43.65107,
    longitude: -79.347015
  }]
};

test('returns coordinates for valid input', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockGeoResponse
  });

  const loc = await getCoordinates("Toronto", "Ontario", "Canada");
  expect(loc.name).toBe("Toronto");
  expect(loc.latitude).toBeCloseTo(43.65);
});

test('throws error for unsupported country', async () => {
  await expect(getCoordinates("Paris", "", "Wakanda"))
    .rejects.toThrow(/Invalid country name/);
});

test('throws error when no city results found', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ results: [] })
  });
  await expect(getCoordinates("UnknownCity", "", "Canada"))
    .rejects.toThrow(/City not found/);
});

test('throws error if API request fails', async () => {
  fetch.mockResolvedValueOnce({ ok: false });
  await expect(getCoordinates("Toronto", "", "Canada"))
    .rejects.toThrow(/Failed to fetch location data/);
});